<template>
  <v-card v-if="userInfo != null" class="pb-5 mx-auto" rounded="lg" width="60%">
    <v-card-title class="orange justify-center">
      Profil uživatele
    </v-card-title>
    <v-card class="transparent" outlined>
      <v-row>
        <v-col cols="4 pa-0 mt-5">
          <v-card class="pa-0 mx-auto transparent" outlined width="40%">
            <v-img :src="'https://mc-heads.net/body/' + userInfo.nickname"></v-img>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-simple-table class="mt-4 transparent">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="font-weight-bold">Jméno:</td>
                  <td>{{ (userInfo.name == "") ? "-" : userInfo.name}}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Příjmení:</td>
                  <td>{{ (userInfo.surname == "") ? "-" : userInfo.surname }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Přihlašovací jméno:</td>
                  <td>{{ userInfo.nickname }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Email:</td>
                  <td>{{ (userInfo.email == "") ? "-" : userInfo.email }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Datum registrace:</td>
                  <td>{{ getDate(userInfo.registered) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Čas registrace:</td>
                  <td>{{ getTime(userInfo.registered) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>
<script>

  export default {
    props: {
        userInfo: {default: null},
    },
    data () {
      return {
        
      }
    },
    methods:{
      getDate(date){
            let array = date.split('T');

            date = array[0];

            array = array[1].split('.');

            array = date.split('-');

            let year = array[0];
            let month = array[1];
            let day = array[2];

            date = day + '. ' + month + '. ' + year;

            return date;
        },
      getTime(date){
            let array = date.split('T');

            array = array[1].split('.');

            return array[0];
        },
    }
  }
</script>
<style>
tr:hover td {
  background-color: #FFB74D;
}
</style>