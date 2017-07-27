/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import LoadingComponents from '../../components/loading/index.vue';


export default {
    install (Vue) {
        Vue.prototype.$loading =  {
            show (text, callback) {
                const Loading = Vue.extend(LoadingComponents);

                let $vm =  new Loading({
                    el: document.createElement('div')
                });

                document.body.appendChild($vm.$el);
                $vm.show(text);

                if(callback){
                    $vm.$on('hidden', callback);
                }

                return $vm;
            },
        };
    }
}