<template>
  <v-app id="inspire">
    <v-system-bar class="px-7 black--text" height="40" color="orange" app>

      <v-row v-if="serverInfo != null" align="center">
        
        <v-col class="px-0" cols="4" sm="3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="pa-0" :style="serverInfoTitleSize" @click="copy('82.208.17.33:27873')" text v-bind="attrs" v-on="on">IP: 82.208.17.33:27873</v-btn>
            </template>
            <span>Zkopírovat IP adresu</span>
          </v-tooltip>
        </v-col>

        <v-col v-if="$vuetify.breakpoint.smAndUp" class="px-0" sm="2">
          <v-card-title class="pa-0" :style="serverInfoTitleSize">Verze: {{serverInfo.version}}</v-card-title>
        </v-col>

        <v-col class="px-0" cols="5" sm="2">
          <v-card-title class="pa-0 ml-5" :style="serverInfoTitleSize">Status: <span class="ml-1  font-weight-bold" :style="serverInfo.status == 'Online' ? 'color: #76FF03' : 'color: red'">{{serverInfo.status.toLowerCase()}}</span></v-card-title>
        </v-col>

        <v-col v-if="$vuetify.breakpoint.smAndUp" class="px-0" sm="2">
          <v-card-title class="pa-0" :style="serverInfoTitleSize"><v-icon :style="iconSize">mdi-account</v-icon>{{serverInfo.players}}/{{serverInfo.slots}}</v-card-title>
        </v-col>
      
        <v-col cols="3" sm="3" class="px-0 mb-1 text-right">
          <v-icon class="mr-2" :style="iconSize" @click="myRedirect('email')">mdi-email</v-icon>
          <v-icon class="mr-2" :style="iconSize" @click="myRedirect('facebook')">mdi-facebook</v-icon>
          <v-icon class="mr-0" :style="iconSize" @click="myRedirect('instagram')">mdi-instagram</v-icon>
        </v-col>
      </v-row>
    </v-system-bar>
    <!-- Desktop nav bar -->
    <v-app-bar v-if="$vuetify.breakpoint.mdAndUp" color="orange lighten-2" app clipped-left flat height="90">

      <v-btn style="font-size: 1.5vw" class="font-weight-bold" text color="black" @click="$router.push({ name: 'homePage' })"><v-icon x-large>mdi-home</v-icon></v-btn>

      <v-btn v-for="link in links" :key="link.title" style="font-size: 1.5vw" class="font-weight-bold text-capitalize" text color="black" @click="$router.push({ name: link.route })">{{ link.title }}</v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="!isUserLogged" color="black" class="white--text px-2" @click="$router.push({ name: 'loginPage' })">Přihlásit se<v-icon class="ml-1">mdi-login-variant</v-icon></v-btn>
      <v-btn v-else color="black" class="white--text px-2" @click="removeUser">Odhlásit se<v-icon class="ml-1">mdi-logout-variant</v-icon></v-btn>
    </v-app-bar>
    <!-- Small devices nav bar (xs, sm)-->
    <v-app-bar v-else color="orange lighten-2" app flat height="70">
      <v-row class="ma-0" align="center">

        <v-col cols="3" sm="2" class="pa-0">
          <v-btn v-if="!isUserLogged" color="orange" height="45" width="40" @click="$router.push({ name: 'loginPage' })">
            <v-icon large>mdi-login-variant</v-icon>
          </v-btn>
          <v-btn v-else color="orange" height="45" width="40" @click="removeUser">
            <v-icon large>mdi-logout-variant</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="6" sm="8" class="white--text font-weight-bold text-center">
          <v-btn text link @click="$router.push({ name: 'homePage' })" :style="logoFontStyle" >CraftFun</v-btn>
        </v-col>
        
        <v-col cols="3" sm="2" class="pa-0 ma-0 text-right">
          <v-btn class="pa-0 ma-0" color="orange" height="45" width="40" @click="isMenuShowed = !isMenuShowed">
            <v-icon large>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      
      </v-row>
    </v-app-bar>
    <!-- Mobile navigation -->
    <nav v-if="$vuetify.breakpoint.smAndDown && isMenuShowed">

      <v-row v-if="isUserLogged" class="orange py-2">
        <v-col class="text-center">
          <v-avatar rounded="0" class="mr-2">
            <v-img :src='"https://minotar.net/avatar/" + userInfo.nickname'></v-img>
          </v-avatar>

          <v-lable>
            {{userInfo.nickname}}
          </v-lable>
        </v-col>
      </v-row>

      <v-divider v-if="isUserLogged"></v-divider> 

        <v-list class="orange py-0 text-center">
          <div v-for="link in links" :key="link.title">
            <v-list-item link @click="$router.push({ name: link.route }); isMenuShowed = false">
              <v-list-item-content>
                <v-list-item-title>
                  {{ link.title }}
                </v-list-item-title>
              </v-list-item-content>
           </v-list-item>

            <v-divider></v-divider>

          </div>   
      </v-list>
      
      <v-list v-if="isUserLogged" class="orange py-0 text-center">
        <div v-for="link in authLinks" :key="link.title" link>
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{link.title}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

        </div>
      </v-list>
      
    </nav>

    <v-navigation-drawer v-if="$vuetify.breakpoint.mdAndUp && isUserLogged" app clipped left>
      <v-list class="orange" height="100vh">
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

    <v-main class="grey lighten-1 pa-0 pa-md-4 pa-lg-8">
      <router-view @setUser="setUser" :userInfo="userInfo"></router-view>
    </v-main>

  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      isUserLogged: false,
      isMenuShowed: false,
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
