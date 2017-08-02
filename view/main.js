

import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';

import Alert from '../src/plugins/alert/index';
import Confirm from '../src/plugins/confirm/index';
import Loading from '../src/plugins/loading/index';
import Toast from '../src/plugins/toast/index';
import Toptip from '../src/plugins/toptip/index';
import Wechat from '../src/plugins/wechat/index';
import Transform from '../src/plugins/transform/index';

Vue.use(Alert);
Vue.use(Confirm);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Toptip);
Vue.use(Wechat);
Vue.use(Vuex);
Vue.use(Transform);

import router from './router';

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

new Vue({
    el: '#app',
    router: router.mount(Vue),
    store: store,
    template: '<App/>',
    components: {
        App: App,
    },
});
