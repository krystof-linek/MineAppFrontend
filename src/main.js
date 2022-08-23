import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import axiosInstance from "./code/http";

Vue.prototype.$http = axiosInstance;

Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
