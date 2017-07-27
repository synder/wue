/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import ConfirmComponents from '../../components/confirm/index.vue';


export default {
    install (Vue) {
        
        let $vm;

        Vue.prototype.$confirm = {
            show (title, content, callback) {

                if(!$vm){
                    const Confirm = Vue.extend(ConfirmComponents);
                    $vm =  new Confirm({
                        el: document.createElement('div')
                    });
                    document.body.appendChild($vm.$el);
                }

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