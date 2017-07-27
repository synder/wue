

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import HomeIndex from './pages/home/index.vue';

import Alert from '../src/plugins/alert/index';
import Confirm from '../src/plugins/confirm/index';
import Loading from '../src/plugins/loading/index';
import Toast from '../src/plugins/toast/index';
import Toptip from '../src/plugins/toptip/index';
import Wechat from '../src/plugins/wechat/index';

Vue.use(Alert);
Vue.use(Confirm);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Toptip);
Vue.use(Wechat);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: HomeIndex
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    template: '<App/>',
    components: {
        App: App,
    },
});
