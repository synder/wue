/**
 * @author synder on 2017/7/25
 * @copyright
 * @desc
 */

const android = function (ua) {
    ua = ua || navigator.userAgent;
    ua.match(/(Android);?[\s\/]+([\d.]+)?/)
};

const wechat = function (ua) {
    ua = ua || navigator.userAgent;
    return /micromessenger/i.test(ua);
};

const ios = function (ua) {
    ua = ua || navigator.userAgent;
    return ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
};

const wp = function (ua) {
    ua = ua || navigator.userAgent;
    ua.match(/Windows Phone ([\d.]+)/)
};

const chrome = function (ua) {
    ua = ua || navigator.userAgent;
    ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
};

const firefox = function (ua) {
    ua = ua || navigator.userAgent;
    ua.match(/Firefox\/([\d.]+)/)
};

const ie = function (ua) {
    ua = ua || navigator.userAgent;
    ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/)
};

export {wechat, ios, android, wp, chrome, firefox, ie};

export default{
    install (Vue) {
        Vue.prototype.$device = {
            wp: wp,
            ios: ios,
            android: android,
            wechat: wechat,
        };
    }
}