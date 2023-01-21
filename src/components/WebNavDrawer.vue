<template>
    <v-navigation-drawer v-if="$vuetify.breakpoint.mdAndUp && isUserLogged" clipped app expand-on-hover width="auto">
      <v-list class="orange" height="100%">
        <v-list-item class="mb-3">
            <v-list-item-icon class="mr-3">
                <v-img width="50px"
                :src='"https://minotar.net/avatar/" + userInfo.nickname'
                >
              </v-img>
            </v-list-item-icon>
            <v-list-item-content class="mx-8">
                <v-list-item-title class="font-weight-medium">
                    {{ userInfo.nickname }}
                </v-list-item-title>
            </v-list-item-content>
          
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
</template>
<script>
export default {
    props: {
        isUserLogged: {default: false},
        userInfo: {default: false}
    },
    data: () => ({
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
                title: "Terminál",
                route: "consolePage",
                icon: "mdi-console",
            },
            {
                title: "Nastavení",
                route: "contactPage",
                icon: "mdi-cog",
            },
        ],
    }),    
}
</script>

