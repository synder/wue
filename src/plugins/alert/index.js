/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import AlertComponents from '../../components/alert/index.vue';


export default {
    install (Vue) {
        Vue.prototype.$alert =  {
            
            show (title, content, callback) {
                const Alert = Vue.extend(AlertComponents);

                let $vm =  new Alert({
                    el: document.createElement('div')
                });

                document.body.appendChild($vm.$el);
                
                $vm.show(title, content);
                
                if(callback){
                    $vm.$on('click', function () {
                        callback();
                    });
                }
                
                return $vm;
            }
        };
    }
}