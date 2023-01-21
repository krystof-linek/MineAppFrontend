<template>
    <v-system-bar v-if="hasServerInfo" class="px-4 black--text text-uppercase font-weight-medium" height="40" color="orange" app clipped-left>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="pa-0" :style="serverInfoTitleSize" @click="copy(serverInfo.host)" text v-bind="attrs" v-on="on">IP: craftfun.cz</v-btn>
        </template>
        <span>Zkopírovat IP adresu</span>
      </v-tooltip>

      <v-spacer v-if="$vuetify.breakpoint.smAndUp && serverInfo.online"></v-spacer>

      <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp && serverInfo.online" :style="serverInfoTitleSize">verze: {{serverInfo.version.name_clean.split(' ')[1]}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title :style="serverInfoTitleSize">status: <span class="ml-1  font-weight-bold" :style="serverInfo.online ? 'color: #76FF03' : 'color: red'">{{serverInfo.online ? 'online' : 'offline'}}</span></v-toolbar-title>

      <v-spacer v-if="$vuetify.breakpoint.smAndUp && serverInfo.online"></v-spacer>

      <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp && serverInfo.online" class="pa-0" :style="serverInfoTitleSize"><v-icon class="mr-2" color="black" :style="iconSize">fas fa-user</v-icon>{{serverInfo.players.online}}/{{serverInfo.players.max}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-icon class="mr-3" color="black" :style="iconSize" @click="myRedirect('discord')">fab fa-discord</v-icon>
      <v-icon class="mr-3" color="black" :style="iconSize" @click="myRedirect('facebook')">fab fa-facebook-square</v-icon>
      <v-icon class="mr-3" color="black" :style="iconSize" @click="myRedirect('instagram')">fab fa-instagram</v-icon>
      <v-icon class="mr-0" color="black" :style="iconSize" @click="myRedirect('email')">fas fa-envelope</v-icon>
      
    </v-system-bar>
</template>
<script>

  export default {
    props: {
        serverInfoTitleSize: {default: null},
        iconSize: {default: null},
    },
    data () {
        return {
            hasServerInfo: false,
            serverInfo: null,
        }
    },
    methods: {
        async loadServerInfo(){
            try{

                const req = this.$http.create({ baseURL:  "https://api.mcstatus.io/v2/status/java"});

                const response = await req.get(`/craftfun.cz`);

                this.serverInfo = response.data;

                this.hasServerInfo = true;

            } catch (e) {
                console.log(e.response.status);
            }
      },
      async copy(text) {
        await navigator.clipboard.writeText(text);
      },
      myRedirect(type){
        if (type == "email")
            window.open('https://github.com/krystof-linek','_blank');
        if (type == "facebook")
            window.open('https://www.facebook.com/krystof.linek/','_blank');
        if (type == "instagram")
            window.open('https://www.instagram.com/craftfun.cz/','_blank');
        if (type == "discord")
            window.open('https://discord.gg/cvTtvY6U37','_blank');
      },
    },
    mounted(){
        this.loadServerInfo();
    }
  }
</script>