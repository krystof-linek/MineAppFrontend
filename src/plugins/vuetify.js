import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueFriendlyIframe from 'vue-friendly-iframe';
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader


Vue.use(Vuetify);
Vue.use(VueFriendlyIframe);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
    },
});
