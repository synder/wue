/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import LoadingComponents from '../../components/loading/index.vue';


export default {
    install (Vue) {

        const Loading = Vue.extend(LoadingComponents);
        
        let $vm =  new Loading({
            el: document.createElement('div')
        });

        document.body.appendChild($vm.$el);
        
        const loading = {
            show (text, callback) {
                $vm.show(text);
                
                if(callback){
                    $vm.$on('hidden', callback);
                }
                
                return this;
            },
            hide () {
                $vm.hide();
            }
        };

        Vue.prototype.$loading = loading;
    }
}