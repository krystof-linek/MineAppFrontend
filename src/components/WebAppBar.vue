<template>
    <v-app-bar v-if="$vuetify.breakpoint.mdAndUp" color="white" outlined height="120" max-height="120" class="px-4 black--text" app clipped-left>

      <v-img src="../assets/logo_desktop.svg" @click="$router.push({ name: 'homePage' })" style="cursor: pointer;"></v-img>

      <v-spacer></v-spacer>

      <v-btn v-for="link in links" :key="link.title" style="font-size: 1.5vw" class="font-weight-bold text-capitalize" text color="black" @click="$router.push({ name: link.route })">{{ link.title }}</v-btn>

      <v-btn v-if="!isUserLogged" color="black" class="white--text px-2 ml-5 font-weight-bold" @click="$router.push({ name: 'loginPage' })">Přihlásit se<v-icon class="ml-1">mdi-login-variant</v-icon></v-btn>
      
      <v-btn v-else color="black" class="white--text px-2 ml-5 font-weight-bold" @click="$emit('sign-out')">Odhlásit se<v-icon class="ml-1">mdi-logout-variant</v-icon></v-btn>
    
    </v-app-bar>

    <!-- Small devices nav bar (xs, sm)-->

    <v-app-bar v-else color="orange lighten-2" app flat height="70">
      <v-row class="ma-0" align="center">

        <v-col cols="3" sm="2" class="pa-0">
          <v-btn v-if="!isUserLogged" color="orange" height="45" width="40" @click="$router.push({ name: 'loginPage' })">
            <v-icon large>mdi-login-variant</v-icon>
          </v-btn>
          <v-btn v-else color="orange" height="45" width="40" @click="$emit('sign-out')">
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

    <!-- Mobile navigation
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
    -->
</template>
<script>
export default {
    props: {
        isUserLogged: {default: false},
    },
    data: () => ({
        drawer: null,
        isMenuShowed: false,

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
    }),
    methods: {
    },
  }
</script>
