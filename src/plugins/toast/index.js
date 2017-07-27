/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import ToastComponents from '../../components/toast/index.vue';


export default {
    install (Vue) {
        Vue.prototype.$toast = {
            show (text, callback) {

                const Toast = Vue.extend(ToastComponents);

                let $vm =  new Toast({
                    el: document.createElement('div')
                });

                document.body.appendChild($vm.$el);

                $vm.message = text;

                $vm.show();

                if(callback){
                    $vm.$on('hidden', callback);
                }

                setTimeout(function () {
                    $vm.hide();
                }, 1500);

                return $vm;
            },
        };
    }
}