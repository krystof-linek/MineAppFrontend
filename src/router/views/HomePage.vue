<template>
  <v-row v-if="$vuetify.breakpoint.mdAndUp">
    <v-col cols="7">
          
        <v-card rounded="lg" class="mb-4" v-for="post in posts" :key="post.id">
          <v-card-title>{{post.title}}</v-card-title>
          <v-card-text>{{post.text}}</v-card-text>
        </v-card>
          
    </v-col>
        
    <v-col cols="5" class="pa-0">
      <v-row class="pa-0 ma-0">
        <v-col cols="12">
          <v-card rounded="lg" class="pa-0 ma-0" height="300">
            <iframe
              :src="`https://mine-app-dynamp.herokuapp.com/?worldname=world&mapname=surface&zoom=1&nopanel=true&hidechat=true&nocompass=true`"
              width="100%"
              height="300"
              frameborder="0" >
            </iframe>
          </v-card>
        </v-col>
            
        <v-col cols="12">
          <v-card class="pa-0 ma-0" rounded="lg">
            <v-card-title class="orange">Sponzor měsíce</v-card-title>
            <v-card color="transparent" outlined>
              <v-list color="px-0 py-4 transparent" outlined>
                <v-list-item>
                  <v-list-item-title class="text-center mt-1 mt-xl-2">
                    <v-chip class="orange lighten-2 text-h5 text-xl-h4 py-xl-6 px-xl-8">
                      krystoflinek
                    </v-chip>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="mt-1 mt-xl-2">
                  <v-card class="mx-auto transparent" outlined width="20%">
                    <v-img src="https://mc-heads.net/body/krystoflinek"></v-img>
                  </v-card>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-center text-subtitle-1 mt-1 mt-xl-2">
                    Hráč za tento měsíc přispěl <v-chip class="font-weight-bold orange lighten-2">500kč</v-chip> na chod serveru.
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-center text-uppercase font-weight-bold text-subtitle-1">
                    Děkujeme!
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

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
    props: {
        userInfo: {default: null},
    },
    data () {
      return {
        posts: [
        {
          id: 0,
          title: "1. Nadpis příspěvku",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Etiam egestas wisi a erat. Donec quis nibh at felis congue commodo. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quisque porta. Nunc dapibus tortor vel mi dapibus sollicitudin. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Nulla est. Maecenas sollicitudin. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
        },
        {
          id: 1,
          title: "2. Nadpis příspěvku",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Etiam egestas wisi a erat. Donec quis nibh at felis congue commodo. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quisque porta. Nunc dapibus tortor vel mi dapibus sollicitudin. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Nulla est. Maecenas sollicitudin. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
        },
        {
          id: 2,
          title: "3. Nadpis příspěvku",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Etiam egestas wisi a erat. Donec quis nibh at felis congue commodo. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quisque porta. Nunc dapibus tortor vel mi dapibus sollicitudin. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Nulla est. Maecenas sollicitudin. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
        },
        {
          id: 3,
          title: "4. Nadpis příspěvku",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Etiam egestas wisi a erat. Donec quis nibh at felis congue commodo. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quisque porta. Nunc dapibus tortor vel mi dapibus sollicitudin. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Nulla est. Maecenas sollicitudin. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
        },
        ]
      }
    },
  }
</script>
