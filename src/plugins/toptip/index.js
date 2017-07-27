/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import ToptipComponents from '../../components/toptip/index.vue';


export default {
    install (Vue) {

        const Toptip = Vue.extend(ToptipComponents);
        
        let $vm =  new Toptip({
            el: document.createElement('div')
        });

        document.body.appendChild($vm.$el);
        
        const toptip = {
            show (message, callback) {
                
                $vm.message = message;
                $vm.show();
                
                if(callback){
                    $vm.$on('hidden', callback);
                }
                
                setTimeout(function () {
                    $vm.hide();
                }, 1500);
                
                return this;
            },
            hide () {
                $vm.hide();
            }
        };

        Vue.prototype.$toptip = toptip;
    }
}