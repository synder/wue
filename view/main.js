

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './App.vue';

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
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
});

import HomePage from './pages/home/index.vue';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component:  HomePage
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    template: '<App/>',
    components: {
        App: App,
    },
});
