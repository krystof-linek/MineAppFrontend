<template>
  <v-row>
        <v-col cols="7">
          
            <v-card rounded="lg" class="mb-4" v-for="post in posts" :key="post.id">
              <v-card-title>{{post.title}}</v-card-title>
              <v-card-text>{{post.text}}</v-card-text>
            </v-card>
          
        </v-col>
        
        <v-col cols="5" class="pa-0">
          <v-row class="pa-0 ma-0">
            <v-col cols="12">
              <v-card rounded="lg" color="transparent" outlined class="pa-0 ma-0" height="300">
                <iframe
                  :src="`https://mine-app-dynamp.herokuapp.com/?worldname=world&mapname=surface&zoom=1&nopanel=true&hidechat=true&nocompass=true`"
                  width="30%"
                  frameborder="0" >
                </iframe>
              </v-card>
            </v-col>
            
            <v-col cols="12">
              <v-card class="pa-0 ma-0" height="300">
                <v-card-title>Server list</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
    </v-row>
</template>
<script>

  export default {

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
