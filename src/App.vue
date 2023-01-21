<template>
  <v-app>

    <web-system-bar :serverInfoTitleSize="serverInfoTitleSize" :iconSize="iconSize"></web-system-bar>

    <web-app-bar :isUserLogged="isUserLogged" @sign-out="removeUser"></web-app-bar>

    <web-nav-drawer :isUserLogged="isUserLogged" :userInfo="userInfo"></web-nav-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container class="grey lighten-1 py-10 px-8" fluid>

        <!-- If using vue-router -->
        <router-view @setUser="setUser" :userInfo="userInfo"></router-view>
    
      </v-container>
    
    </v-main>

    <web-footer></web-footer>

  </v-app>
</template>

<script>
import WebSystemBar from './components/WebSystemBar';
import WebAppBar from './components/WebAppBar';
import WebFooter from './components/WebFooter';
import WebNavDrawer from './components/WebNavDrawer';

export default {
  name: 'App',

  components: {
    WebSystemBar,
    WebAppBar,
    WebFooter,
    WebNavDrawer
  },

  data: () => ({
      isUserLogged: false,
      userInfo: null,
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
      this.$credentialsManager.isUserCredentialsData() ? this.getUserInfo() : '';
    }
  }
</script>
