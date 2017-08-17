/**
 * @author synder on 2017/7/29
 * @copyright
 * @desc
 */

const uuid = function uuid() {
    const str = function () {
        return (((1 + Math.random()) * 0x10000) | 0 ).toString(16);
    };
    return str() + str() + str() + str() + str();
};

export default {
    install (Vue) {
        Vue.prototype.$uuid = uuid;
    }
};