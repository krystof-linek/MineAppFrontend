<template>
    <div class="px-5">
        <h1 class="pt-5">{{ postData.title }}</h1>
        <v-container fluid>
            <v-layout row>
                <v-chip class="ma-2 ml-0 text-uppercase font-weight-medium" color="warning" label>{{ postData.categoryName }}</v-chip>
                
                <v-chip class="ma-2 text-uppercase font-weight-medium" label>
                    <v-avatar left>
                        <v-icon small>fa-solid fa-user</v-icon>
                    </v-avatar>
                    {{ postData.author }}
                </v-chip>

                <v-chip v-if="postData.edited != ''" class="ma-2 text-uppercase font-weight-medium" label>
                    <v-avatar left>
                        <v-icon small>fa-solid fa-user-pen</v-icon>
                    </v-avatar>
                    {{ postData.edited }}
                </v-chip>

                <v-chip class="ma-2 text-uppercase font-weight-medium" label>
                    <v-avatar left>
                        <v-icon small>fa-solid fa-calendar-days</v-icon>
                    </v-avatar>
                    {{ this.formattedDate(postData.modified) }}
                </v-chip>

                <v-spacer></v-spacer>

                <v-chip v-if="postData.important" class="ma-2 text-uppercase font-weight-medium black--text" label color="error">
                    <v-avatar left>
                        <v-icon small>fa-solid fa-triangle-exclamation</v-icon>
                    </v-avatar>
                    důležitý
                </v-chip>

                <v-chip v-if="isNew(postData.modified)" color="success" class="ma-2 mr-0 text-uppercase font-weight-medium black--text" label>
                    <v-avatar left>
                        <v-icon small>fa-solid fa-star</v-icon>
                    </v-avatar>
                    nový
                </v-chip>
                     
            </v-layout>
        </v-container>
        <div class="pb-5" v-html="postData.htmlContent" />
    </div>
</template>
<script>
import moment from 'moment'

export default {
    props: {
        postData: {
            title: {default: ''},
            htmlContent: {default: ''},
            categoryName: {default: ''},
            author: {default: ''},
            edited: {default: ''},
            created: {default: ''},
            modified: {default: ''},
        }
    },
    data () {
      return {
      }
    },
    methods: {
        formattedDate(timestamp){
            let date = new Date(timestamp);

            return moment(date).locale('cs').format('LL') + ' ' + moment(date).locale('cs').format('LT');
        },
        isNew(modifed) {
            let now = Date.now();
            let diffTime = Math.abs(now - modifed);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            return diffDays <= 3 ? true : false
        },
    },
    mounted() {
    }
}
</script>
<style>

h1 {
    font-size: 2em;
    margin-top: 0.3em;
    margin-bottom: 0.1em;
}

h2 {
    font-size: 1.8em;
    margin-top: 0.3em;
    margin-bottom: 0.1em;
}

h3 {
    font-size: 1.6em;
    margin-top: 0.3em;
    margin-bottom: 0.1em;
}

h4 {
    font-size: 1.4em;
    margin-top: 0.3em;
    margin-bottom: 0.1em;
}

h5 {
    font-size: 1.2em;
    margin-top: 0.3em;
    margin-bottom: 0.1em;
}

h6 {
    font-size: 1em;
    margin-top: 0.3em;
    margin-bottom: 0.1em;
}

p {
    font-size: 1em;
    margin-top: 0em;
    margin-bottom: 0em !important;
    padding-bottom: 0em;
}
</style>