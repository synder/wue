/**
 * @author synder on 2017/7/26
 * @copyright
 * @desc
 */


const set = function (key, value, attributes) {
    
    if(!attributes.path){
        attributes.path = '/';
    }
    
    if (typeof attributes.expires === 'number') {
        let expire = new Date();
        expire.setMilliseconds(expire.getMilliseconds() + attributes.expires * 864e+5);
        attributes.expires = expire;
    }

    // We're using "expires" because "max-age" is not supported by IE
    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

    let result;
    
    try {
        result = JSON.stringify(value);
        if (/^[\{\[]/.test(result)) {
            value = result;
        }
    } catch (e) {}

    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

    key = encodeURIComponent(String(key));
    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
    key = key.replace(/[\(\)]/g, escape);

    let stringAttribute = '';

    for (let name in attributes) {
        if(attributes.hasOwnProperty(name)){
            if (!attributes[name]) {
                continue;
            }
            stringAttribute += '; ' + name;
            if (attributes[name] === true) {
                continue;
            }
            stringAttribute += '=' + attributes[name];
        }
    }
    return (document.cookie = key + '=' + value + stringAttribute);
};

const get = function (key) {
    
    let result;
    
    if(!key){
        result = {};
    }
    
    let cookies = document.cookie ? document.cookie.split('; ') : [];
    let encode = /(%[0-9A-Z]{2})+/g;
    
    for(let i = 0; i < cookies.length; i++){
        
        let parts = cookies[i].split('=');
        let cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
        }

        try {
            let name = parts[0].replace(encode, decodeURIComponent);
            cookie =  cookie.replace(encode, decodeURIComponent);
            
            try {
                cookie = JSON.parse(cookie);
            } catch (e) {
                
            }
            
            if (!key) {
                result[name] = cookie;
            }else{
                if (key === name) {
                    result = cookie;
                    break;
                }
            }
        } catch (e) {}
    }
    
    return result;
};

const del = function (key, attributes) {
    
    if(!attributes){
        attributes = {};
    }
    attributes.expires = -1;
    
    set(key, '', attributes);
};

export {set, get, del};

export default {
    install (Vue) {
        Vue.prototype.$cookie = {
            set: set,
            get: get,
            del: del
        };
    }
};