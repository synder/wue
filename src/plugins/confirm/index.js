/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import ConfirmComponents from '../../components/confirm/index.vue';


export default {
    install (Vue) {

        const Confirm = Vue.extend(ConfirmComponents);
        
        let $vm =  new Confirm({
            el: document.createElement('div')
        });

        document.body.appendChild($vm.$el);
        
        const confirm = {
            show (title, content, callback) {
                $vm.show(title, content);
                $vm.$on('confirm', function () {
                    callback(true);
                });

                $vm.$on('cancel', function () {
                    callback(false);
                });

                return this;
            },
            hide () {
                $vm.hide();
            }
        };

        Vue.prototype.$confirm = confirm;
    }
}