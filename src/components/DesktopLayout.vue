<template>
  <v-app id="inspire">
    <v-system-bar class="px-2" height="40" color="orange" app>

      <v-row v-if="serverInfo != null">
        
        <v-col class="px-0" cols="6" sm="4">
          <v-card-title :style="serverInfoTitleSize">IP: 82.208.17.33:27873</v-card-title>
        </v-col>

        <v-col v-if="$vuetify.breakpoint.smAndUp" class="px-0" cols="3" sm="3">
          <v-card-title :style="serverInfoTitleSize">Verze: {{serverInfo.version}}</v-card-title>
        </v-col>

        <v-col class="px-0" cols="6" sm="3">
          <v-card-title :style="serverInfoTitleSize">Status: <span class="ml-1  font-weight-bold" :style="serverInfo.status == 'Online' ? 'color: #76FF03' : 'color: red'">{{serverInfo.status.toLowerCase()}}</span></v-card-title>
        </v-col>

        <v-col v-if="$vuetify.breakpoint.smAndUp" class="px-0" cols="2" sm="2">
          <v-card-title :style="serverInfoTitleSize"><v-icon :style="iconSize">mdi-account</v-icon>{{serverInfo.players}}/{{serverInfo.slots}}</v-card-title>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>

      <v-icon class="mr-2" :style="iconSize" @click="myRedirect('email')">mdi-email</v-icon>

      <v-icon class="mr-2" :style="iconSize" @click="myRedirect('facebook')">mdi-facebook</v-icon>

      <v-icon :style="iconSize" @click="myRedirect('instagram')">mdi-instagram</v-icon>

    </v-system-bar>

    <v-app-bar color="orange lighten-2" app clipped-left flat height="90">

      <v-btn style="font-size: 1.5vw" class="font-weight-bold" text color="black" @click="$router.push({ name: 'homePage' })"><v-icon x-large>mdi-home</v-icon></v-btn>

      <v-btn v-for="link in links" :key="link.title" style="font-size: 1.5vw" class="font-weight-bold" text color="black" @click="$router.push({ name: link.route })">{{ link.title }}</v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer v-if="isUserLogged" app clipped left>
      <v-list class="orange" height="100vh">
        <v-list-item class="ma-2 mb-3">
          <v-row>
              <v-col cols="4" class="pa-0 ma-0">
                <v-img width="70%"
                src="https://minotar.net/avatar/krystoflinek"
                >
              </v-img>
            </v-col>

            <v-col cols="8">
              <v-card-title class="pa-0 ma-0">krystoflinek</v-card-title>
            </v-col>
          </v-row>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="n in 5" :key="n" link>
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-1 pa-0 pa-md-4 pa-lg-8">
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      isUserLogged: true,
      serverInfo: null,

      links: [
        {
          title: "Obchod",
          route: "shopPage"
        },
        {
          title: "Kontakt",
          route: "contactPage",
        }
      ],
    }),
    computed: {
      serverInfoTitleSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 'font-size: 2.3vw'
          case 'sm': return 'font-size: 1.6vw'
          case 'md': return 'font-size: 1.3vw'
          case 'lg': return 'font-size: 1.2vw'
          default: return 'font-size: 1vw'
        }
      },
      iconSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 'font-size: 5vw'
          case 'sm': return 'font-size: 2.5vw'
          case 'md': return 'font-size: 2.1vw'
          case 'lg': return 'font-size: 1.7vw'
          default: return 'font-size: 1.4vw'
        }
      },
    },
    methods: {
      async loadServerInfo(){
        try{

          const req = this.$http.create({ baseURL:  "https://query.fakaheda.eu"});

          const response = await req.get(`/82.208.17.33:27873.feed`);

          this.serverInfo = response.data;

        } catch (e) {
          const status = e.response.status;
            
          console.log(status);
        }
      },
      myRedirect(type){
        if (type == "email")
          window.open('https://github.com/krystof-linek','_blank');
        if (type == "facebook")
          window.open('https://www.facebook.com/krystof.linek/','_blank');
        if (type == "instagram")
          window.open('https://www.instagram.com/craftfun.cz/','_blank');
    },
    },
    mounted(){
      this.loadServerInfo();
    }
  }
</script>
