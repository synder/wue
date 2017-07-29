/**
 * @author synder on 2017/7/29
 * @copyright
 * @desc
 */

class Url {
    constructor(url){
        
    }
    
    static parse(){
        
    }
    
    static format(){
        
    }

    static pathname(){
        
    }

    static hostname(){
        
    }

    static protocol(){
        
    }

    static query(){
        
    }

    static hash(){
        
    }
}


export default {
    install (Vue) {
        Vue.prototype.$url = {
            parse: Url.parse,
            format: Url.format,
            pathname: Url.pathname,
            hostname: Url.hostname,
            protocol: Url.protocol,
            query: Url.query,
            hash: Url.hash,
        };
    },
}
