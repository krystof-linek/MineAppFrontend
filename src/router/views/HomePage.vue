<template>
  <v-row v-if="$vuetify.breakpoint.mdAndUp">
    <v-col cols="7">
        <v-card rounded="lg" class="mb-4 three-lines" hidden v-for="post in posts" :key="post.postId" @mouseover="hoveredPost = post.postId" @mouseleave="hoveredPost = -1" 
                @click="$router.push({ name: 'webPostPage', params: {id_post: post.postId, post: formatePost(post)} })"> 
          
          <web-post :postData = formatePost(post)></web-post>
      
          <v-card-actions class="justify-end" v-if="hoveredPost == post.postId">
            <v-btn color="black" text><v-icon class="mr-1">fa-solid fa-trash-can</v-icon>smazat</v-btn>
            <v-btn color="black" text><v-icon class="mr-1">fa-solid fa-share-from-square</v-icon>sdílet</v-btn>
            <v-btn color="black" text @click="$router.push({ name: 'webPostPage', params: {postTitle: post.title, postText: post.text, propEdit: true} })">
              <v-icon class="mr-1">fa-solid fa-pen-to-square</v-icon>upravit
            </v-btn>
          </v-card-actions>
        </v-card> 
    </v-col>
        
    <v-col cols="5" class="pa-0">
      <v-row class="pa-0 ma-0">
        <v-col cols="12">
          <v-card rounded="lg" class="pa-0 ma-0" height="300">
            <iframe
              :src="`https://craftfun.cz/mapa/?worldname=world&mapname=surface&zoom=1&nopanel=true&hidechat=true&nocompass=true`"
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
import WebPost from '../../components/WebPost';

export default {
    props: {
        userInfo: {default: null},
    },
    components: {
      WebPost
    },
    data () {
      return {
        hoveredPost: -1,
        postsToLoad: 6,
        posts: []
      }
    },
    methods: {
      async loadLastPosts(){
        try {
          const response =  await this.$http.get(`/post/get/lasts/${this.postsToLoad}`);

          this.posts = response.data;

        } catch(e){
          console.log(e)
        }
      },
      formatePost(post){
        let postData = {
          title: post.title,
          htmlContent: post.htmlContent,
          categoryName: post.category.category_name,
          author: post.author,
          edited: post.edited,
          created: post.created,
          modified: post.modified,
          important: post.important,
        };

        return postData
      }
    },
    mounted() {
      if (this.posts.length == 0)
        this.loadLastPosts()
    },
  }
</script>

<style>
.three-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  white-space: normal;
}
</style>
