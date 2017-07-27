/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import AlertComponents from '../../components/alert/index.vue';


export default {
    install (Vue) {

        const Alert = Vue.extend(AlertComponents);
        
        let $vm =  new Alert({
            el: document.createElement('div')
        });

        document.body.appendChild($vm.$el);
        
        const alert = {
            show (title, content, callback) {
                $vm.show(title, content);
                if(callback){
                    $vm.$on('click', function () {
                        callback();
                    });
                }
                return this;
            },
            hide () {
                $vm.hide();
            }
        };

        Vue.prototype.$alert = alert;
    }
}