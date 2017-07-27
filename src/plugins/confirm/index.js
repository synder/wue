/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import ConfirmComponents from '../../components/confirm/index.vue';


export default {
    install (Vue) {

        Vue.prototype.$confirm = {
            show (title, content, callback) {

                const Confirm = Vue.extend(ConfirmComponents);

                let $vm =  new Confirm({
                    el: document.createElement('div')
                });

                document.body.appendChild($vm.$el);

                $vm.show(title, content);

                if(callback){
                    $vm.$on('confirm', function () {
                        callback(true);
                    });

                    $vm.$on('cancel', function () {
                        callback(false);
                    });
                }

                return $vm;
            },
        };
    }
}