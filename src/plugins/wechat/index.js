/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

const wechatSDK = require('weixin-js-sdk');

export default {
    install (Vue) {
        Vue.prototype.$wechat = wechatSDK;
    },
}
