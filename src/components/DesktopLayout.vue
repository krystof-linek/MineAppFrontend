<template>
  <v-app id="inspire">
    <v-system-bar height="40" color="orange" app>
      <v-spacer></v-spacer>

      <v-icon>mdi-email</v-icon>

      <v-icon>mdi-facebook</v-icon>

      <v-icon>mdi-instagram</v-icon>
    </v-system-bar>

    <v-app-bar color="orange lighten-2" app clipped-right flat height="90">

      <v-btn style="font-size: 1.5vw" class="font-weight-bold" text color="black" @click="$router.push({ name: 'homePage' })"><v-icon x-large>mdi-home</v-icon></v-btn>

      <v-btn v-for="link in links" :key="link" style="font-size: 1.5vw" class="font-weight-bold" text color="black" @click="$router.push({ name: link.route })">{{ link.title }}</v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer app clipped right>
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

    <v-main class="grey lighten-1 pa-4">
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,

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
  }
</script>
