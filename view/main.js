

import Vue from 'vue';

import router from './router';
import App from './App.vue';

import Alert from '../src/plugins/alert/index';
import Confirm from '../src/plugins/confirm/index';

Vue.use(Alert);
Vue.use(Confirm);

new Vue({
    el: '#app',
    router: router.mount(Vue),
    template: '<App/>',
    components: {
        App: App,
    },
});
