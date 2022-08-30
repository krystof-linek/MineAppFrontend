<template>
  
  <v-card class="mx-auto mt-7 mt-md-7 pb-0 orange lighten-2" 
    :rounded="$vuetify.breakpoint.smAndUp ? 'lg' : '0'" 
    :width="$vuetify.breakpoint.lgAndUp ? '40vw' : $vuetify.breakpoint.md ? '50%' : $vuetify.breakpoint.sm ? '60%' : '100%'"
    >
    <v-card-title class="text-center orange">
      Přihlášení
    </v-card-title>
    <v-card width='90%' class="mx-auto py-6 transparent" outlined>
      <v-form v-model="valid" @submit.prevent="loginUser">
        <v-container>
          <v-row class="pa-0">
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="nickname"
                color="black"
                outlined 
                :rules="nameRules" 
                label="Přihlašovací jméno" 
                required
                prepend-inner-icon="mdi-account"
                hint="Zadej svůj nickname v minecraftu.">
              </v-text-field>
            </v-col>

            <v-col cols="12" class="pa-0">
              <v-text-field 
                v-model="password"
                color="black"
                :type="isShowedPassword ? 'text' : 'password'" 
                outlined 
                :rules="passwordRules" 
                label="Heslo" required 
                :append-icon="isShowedPassword ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-inner-icon="mdi-lock" 
                @click:append="isShowedPassword = !isShowedPassword"
                hint="Zadej heslo ke svému účtu.">
              </v-text-field>
            </v-col>
            <v-col v-if="isAlert" cols="12" class="pa-0">
              <v-alert
                border="top"
                colored-border
                type="error"
                elevation="1"
                >
                {{alert}}
              </v-alert>
            </v-col>
            <v-col cols="6" class="pa-0">
              <v-btn type="submit" :disabled="!valid" color="green">přihlásit se</v-btn>
            </v-col>
            <v-col cols="6" class="pa-0 text-right">
              <v-btn color="red" @click="$router.push({ name: 'registerPage' })">registrovat se</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-card>
</template>
<script>

  export default {

    data () {
      return {
        isShowedPassword: false,
        isAlert: false,

        alert: '',
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
        this.isAlert = false;

        try{
          this.nickname = this.nickname.toLowerCase();

          const response = await this.$http.post("/user/login", {nickname: this.nickname, password: this.password});

          if (response.status == 200){
            this.$credentialsManager.setCredentials(response.data, this.nickname);
            this.getUserInfo();
          }
      
        } catch(e){
          this.setAlert(e.response.status);
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
          this.setAlert(e.statusCode);
        }
      },

      setAlert(statusCode){

        switch(statusCode) {
          case 404:
            this.alert = "Účet s tímto přihlašovacím jménem neexistuje!";
            break;
          case 401:
            this.alert = "Zadal jsi nesprávné heslo!";
            break;
          default:
            this.alert = "Vyskytla se neočekáváná chyba, kontaktujte prosím administrátory.";
        } 

        this.isAlert = true;
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
