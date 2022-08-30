import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import CredentialsManager from "./code/credentialsManager";
import axiosInstance from "./code/http";

export const credentialsManager = new CredentialsManager();
credentialsManager.findCredentialsData();

Vue.prototype.$credentialsManager = credentialsManager;

Vue.prototype.$http = axiosInstance;

Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
