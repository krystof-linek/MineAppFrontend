<template>
  <v-app id="inspire">

    <!-- server status bar -->

    <!-- Desktop nav bar -->

    <v-navigation-drawer v-if="$vuetify.breakpoint.mdAndUp && isUserLogged" clipped app expand-on-hover max-height="100">
      <v-list class="orange">
        <v-list-item class="ma-2 mb-3">
          <v-row>
              <v-col cols="4" class="pa-0 ma-0">
                <v-img width="70%"
                :src='"https://minotar.net/avatar/" + userInfo.nickname'
                >
              </v-img>
            </v-col>

            <v-col cols="8">
              <v-card-title class="pa-0 ma-0">{{ userInfo.nickname }}</v-card-title>
            </v-col>
          </v-row>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="link in authLinks" :key="link.title" link @click="$router.push({ name: link.route })">
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{link.title}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container class="grey lighten-1 px-8 pb-4">
      <router-view @setUser="setUser" :userInfo="userInfo"></router-view>
    </v-container>

  </v-app>
</template>

<script>
  export default {

    data: () => ({
      drawer: null,
      isUserLogged: false,
      isMenuShowed: false,
      hasServerInfo: false,
      serverInfo: null,
      userInfo: null,

      links: [
        {
          title: "AdminTým",
          route: "contactPage",
        },
        {
          title: "Pravidla",
          route: "contactPage",
        },
        {
          title: "BanList",
          route: "banListPage",
        },
        {
          title: "Obchod",
          route: "shopPage"
        },
        {
          title: "Kontakt",
          route: "contactPage",
        }
      ],

      authLinks: [
        {
          title: "Profil",
          route: "profilePage",
          icon: "mdi-account-circle"
        },
        {
          title: "Nákupy",
          route: "contactPage",
          icon: "mdi-cart",
        },
        {
          title: "Nastavení",
          route: "contactPage",
          icon: "mdi-cog",
        },
        {
          title: "Terminal",
          route: "consolePage",
          icon: "mdi-cog",
        },
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

          const req = this.$http.create({ baseURL:  "https://api.mcstatus.io/v2/status/java"});

          const response = await req.get(`/craftfun.cz`);

          this.serverInfo = response.data;

          this.hasServerInfo = true;

        } catch (e) {
          console.log(e.response.status);
        }
      },
      async getUserInfo(){
        try{
          const nickname = this.$credentialsManager.getNickname();

          const response = await this.$http.get(`/user/info/${nickname}`);

          if (response.status == 200){
            this.userInfo = response.data;
            this.isUserLogged = true;
          }
  
        } catch(e){
          if (e.response.status == 403){
            this.$credentialsManager.removeCredentials();
            this.$router.push({ name: 'loginPage' })
          }
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
      setUser(userInfo){
        this.userInfo = userInfo;

        if (this.userInfo != null)
          this.isUserLogged = true;
      },
      removeUser(){
        this.userInfo = null;
        this.isUserLogged = false;
        this.$credentialsManager.removeCredentials();
      }
    },
    mounted(){
      this.loadServerInfo();
      this.$credentialsManager.isUserCredentialsData() ? this.getUserInfo() : '';
    }
  }
</script>
