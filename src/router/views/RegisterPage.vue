<template>
  
  <v-card v-if="$vuetify.breakpoint.mdAndUp" class="mx-auto mt-2 pb-0 orange lighten-2" rounded="lg" width="40vw">
    <v-card-title class="text-center orange">
      Registrace
    </v-card-title>
    <v-card width="60%" class="mx-auto py-6 transparent" outlined>
      <v-form v-model="valid" @submit.prevent="loginUser">
        <v-container>
          <v-row class="pa-0">
            <v-col cols="12" class="pa-0">
              <v-text-field v-model="nickname" outlined :rules="nameRules" label="Přihlašovací jméno" required></v-text-field>
            </v-col>

            <v-col cols="12" class="pa-0">
              <v-text-field v-model="password" outlined :rules="passwordRules" label="Heslo" required></v-text-field>
            </v-col>
            <v-col cols="6" class="pa-0">
              <v-btn type="submit" :disabled="!valid" color="green">přihlásit se</v-btn>
            </v-col>
            <v-col cols="6" class="pa-0 text-right">
              <v-btn color="red">registrovat se</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-card>

  <v-row class="ma-0" v-else>
    <v-col class="pa-0" cols="12">
      <v-card rounded="0" v-for="post in posts" :key="post.id">
        <v-card-title>{{post.title}}</v-card-title>
        <v-card-text>{{post.text}}</v-card-text>
        <v-divider></v-divider>
      </v-card>    
    </v-col>
  </v-row>
</template>
<script>

  export default {

    data () {
      return {
        valid: false,
        nickname: '',
        password: '',

        nameRules: [
          v => !!v || 'Přihlašovací jméno je povinný údaj!',
          v => v.length <= 30 || 'Přihlašovací jméno nemůže být delší jak 30 znaků!',
        ],
        passwordRules: [
          v => !!v || 'Heslo je povinný údaj!'
        ],
      }
    },
    methods: {
      async loginUser(){
        try{
          const response = await this.$http.post("/user/login", {nickname: this.nickname, password: this.password});

          if (response.status == 200){
            this.$credentialsManager.setCredentials(response.data, this.nickname);
            this.getUserInfo();
          }
      
        } catch(e){
          console.log(e);
        }
      },

      async getUserInfo(){
        try{
          const response = await this.$http.get(`/user/info/${this.nickname}`);

          if (response.status == 200){
            this.$emit('setUser', response.data);

            this.$router.push({ name: 'homePage' });
          }
          
        } catch(e){
          console.log(e);
        }
      },

      async newUser(){
        
        this.$credentialsManager.setToken(this.token);
        let role = this.getRole();
        try {
          const response = await this.$http.post("/user/new", {classRoom: this.student.letter, grade: this.student.grade, role: role});

          const user = response.data;

          if (user.validated){
            this.$userManager.setEmail(user.email);
            this.$emit("userLogged");
          } else {
            this.$tokenManager.removeToken();
            this.isNewUser = false;
            this.dialogWarning.title = "Upozornění";
            this.dialogWarning.text = "Váš účet nebyl dosud ověřen. Prosím vyčkejte, než dojde k jeho ověření."
            this.dialogWarning.isSet = true;
          }

        } catch(e){
          const statusCode = e.response.status;
          this.$tokenManager.removeToken();
          if (statusCode == 403){
              this.error = "Token is not valid!";
          } else if (statusCode == 409){
              this.error = "User already exist!";
          } 
        }
      },

      
    }
  }
</script>
