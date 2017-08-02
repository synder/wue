/**
 * @author synder on 2017/8/2
 * @copyright
 * @desc
 */

import Transform from '../../lib/transform/index.js';

export default {
    install (Vue) {
        
        Vue.prototype.$transform = Transform;
        
        Vue.directive('transform', {
            bind: function(el, binding){
                Transform(el);
                let value = binding.value;
                for(let key in value){
                    if(value.hasOwnProperty(key)){
                        el[key] = value[key];
                    }
                }
            },
            update: function(el, binding){
                let value = binding.value;
                for(let key in value){
                    if(value.hasOwnProperty(key)){
                        el[key] = value[key];
                    }
                }
            },
        })
    }
};