<template>
    <v-card rounded="lg" class="mx-auto px-5 pb-3 pt-2" width="80%">
        <div v-if="edit" class="mx-2 mt-2">
            <v-text-field class="pt-5 mb-0" v-model="postData.title" label="Zadejte název příspěvku" solo></v-text-field>

            <v-container fluid class="py-0 pb-2">
                <v-row justify="center" align="center">

                    <v-col cols="3">
                        <v-layout row >
                            
                            <v-btn fab class="white--text mr-4 mt-1" color="success" small @click="loadAllLists()">
                                <v-icon>fa-solid fa-plus</v-icon>
                            </v-btn>

                            <v-select hide-details class="py-2" label="Kategorie" dense solo></v-select>
                        </v-layout>
                    </v-col>

                    <v-col cols="9">
                        <v-layout row wrap justify-end>
                            <v-chip class="text-uppercase font-weight-medium black--text" label :color="postData.important ? 'error' : ''" @click="postData.important = !postData.important">
                            
                            <v-avatar left>
                                <v-icon small>fa-solid fa-triangle-exclamation</v-icon>
                            </v-avatar>

                            důležitý

                            </v-chip>

                            <v-chip v-if="isNew(postData.modified)" color="success" class="ml-5 text-uppercase font-weight-medium black--text" label>
                            
                            <v-avatar left>
                                <v-icon small>fa-solid fa-star</v-icon>
                            </v-avatar>

                            nový

                            </v-chip>
                        </v-layout>
                    </v-col>

                </v-row>
            </v-container>

            <vue-2-editor class="mt-5" :propContent = postData.htmlContent @changeContent = "changeContent"></vue-2-editor>
        </div>

        <div v-else>
            <web-post :postData = postData></web-post>
        </div>

        <v-card-actions class="justify-end">
            <v-btn class="black--text" color="warning" @click="edit = !edit">
                <v-icon v-if="edit" class="mr-2">fa-sharp fa-solid fa-magnifying-glass</v-icon>
                <v-icon v-else class="mr-2">fa-solid fa-pen-to-square</v-icon>
                {{ edit ? 'náhled' : 'editace'}}
            </v-btn>
            <v-btn class="black--text" color="success" @click="savePost"><v-icon class="mr-2">fa-solid fa-floppy-disk</v-icon>uložit</v-btn>
        </v-card-actions>

    </v-card>
</template>
<script>
import WebPost from '../../components/WebPost';
import Vue2Editor from '../../components/Vue2Editor';

//import file from '../../assets/posts/minecraft/PostWithID27.html'

export default {
    props: {
        post: null
    },
    components: {
        WebPost,
        Vue2Editor
    },
    data () {
        return {
            postData: {
                postId: -1,
                author: 'krystoflinek',
                edited: "",
                htmlContent: '',
                pathHtmlContent: '',
                title: "Tohle je můj nadpis2",
                categoryId: 1,
                categoryName: '',
            },
            important: true,

            edit: false
        }
    },
    methods: {
        async loadPostById(){
            try {
                const response =  await this.$http.get(`/post/get/${this.$route.params.id_post}`);

                this.postData = this.formatPost(response.data)

            } catch(e){
                console.log(e)
            }
        },
        async savePost(){

            let formData = new FormData();

            formData.append('author', this.postData.author);
            formData.append('htmlContent', this.postData.htmlContent);
            formData.append('title', this.postData.title);
            formData.append('categoryId', this.postData.categoryId);

            try {
                const response = await this.$http.post("/post/create", formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                    console.log(response.data)
                    this.setPostData(response.data)

            } catch (error) {
                console.error(error);
            }
        },
        changeContent(content){
            this.postData.htmlContent = content
        },
        formatPost(post){
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
        },
        isNew(modified) {
            let now = Date.now();
            let diffTime = Math.abs(now - modified);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            return diffDays <= 3 ? true : false
        },
        setPostData(newData){
            this.postData.postId = newData.postId;
            this.postData.author = newData.author;
            this.postData.edited = newData.edited;
            this.postData.htmlContent = newData.pathHtmlContent;
            this.postData.title = newData.title;
            this.postData.categoryId = newData.category.id;
            this.postData.categoryName = newData.category.category_name;
            this.postData.pathHtmlContent = newData.pathHtmlContent;

            this.loadPost();
        },
    },
    mounted(){
        if (this.post == null)
            this.loadPostById()
        else
            this.postData = this.post
            this.edit = this.propEdit
    }
  }
</script>