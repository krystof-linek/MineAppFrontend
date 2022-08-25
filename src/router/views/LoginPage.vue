<template>
  
  <v-card v-if="$vuetify.breakpoint.mdAndUp" class="mx-auto mt-2 pb-0 orange lighten-2" rounded="lg" width="40vw">
    <v-card-title class="text-center orange">
      Přihlášení
    </v-card-title>
    <v-card width="60%" class="mx-auto py-6 transparent" outlined>
      <v-form v-model="valid">
        <v-container>
          <v-row class="pa-0">
            <v-col cols="12" class="pa-0">
              <v-text-field v-model="login" outlined :rules="nameRules" label="Přihlašovací jméno" required></v-text-field>
            </v-col>

            <v-col cols="12" class="pa-0">
              <v-text-field v-model="password" outlined :rules="passwordRules" label="Heslo" required></v-text-field>
            </v-col>
            <v-col cols="6" class="pa-0">
              <v-btn color="green">přihlásit se</v-btn>
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
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Přihlašovací jméno je povinný údaj!',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      passwordRules: [
        v => !!v || 'Heslo je povinný údaj!'
      ],
      }
    },
  }
</script>
