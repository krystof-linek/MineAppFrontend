import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import CredentialsManager from "./code/credentialsManager";

import axiosInstance from "./code/http";

import VueSSE from 'vue-sse';

import Vue2Editor from "vue2-editor";


export const credentialsManager = new CredentialsManager();
credentialsManager.findCredentialsData();

Vue.prototype.$credentialsManager = credentialsManager;

Vue.prototype.$http = axiosInstance;

Vue.prototype.$sse = VueSSE;

Vue.config.productionTip = false

new Vue({
  VueSSE,
  vuetify,
  Vue2Editor,
  router: router,
  render: h => h(App)
}).$mount('#app')
