/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

import LoadingComponents from '../../components/loading/index.vue';


export default {
    install (Vue) {
        let $vm;

        Vue.prototype.$loading = function (text, callback) {
            if (!$vm) {
                const Loading = Vue.extend(LoadingComponents);

                $vm = new Loading({
                    el: document.createElement('div')
                });

                document.body.appendChild($vm.$el);
            }
            $vm.show(text);

            if (callback) {
                $vm.$on('hidden', callback);
            }

            return $vm;
        };
    }
}