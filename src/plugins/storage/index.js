/**
 * @author synder on 2017/7/27
 * @copyright
 * @desc
 */

class Store {
    constructor(storage, db){
        this.db = db || 0;
        this.storage = storage;
        
        if(!(this.storage instanceof  Storage)){
            throw new Error('storage must be a instance of Storage');
        }
    }
    
    static __genKey(db, key){
        return encodeURIComponent(db) + ':' + encodeURIComponent(key);
    }

    static __parseKey(key){
        if(!key){
            return null;
        }
        let temp = key.split(':');
        
        return temp.length > 1 ? decodeURIComponent(temp[1]) : null;
    }

    static __genValue(value, expire){
        
        let type = '';
        
        if(value === null){
            type = '';
            value = '';
        }else if(value === undefined){
            type = '';
            value = '';
        }else if(value instanceof Date){
            type = 'date';
            value = JSON.stringify(value);
        }else if(value instanceof RegExp){
            type = 'regexp';
            value = value.toString();
        }else if(typeof value === 'string'){
            type = 'string';
        }else if(typeof value === 'number'){
            type = 'number';
        }else if(typeof value === 'boolean'){
            type = 'boolean';
            value = value ? 1 : 0;
        }else if(typeof value === 'object'){
            type = 'object';
            value = JSON.stringify(value);
        }else{
            throw new Error('this type of value can not be store');
        }
        
        if(!expire){
            expire = 0;
        }else{
            expire = Date.now() + expire;
        }
        
        return  expire + ':' + type + ':' + encodeURIComponent(value);
    }
    
    static __parseValue(value){
        
        if(!value){
            return null;
        }
        
        let temp = value.split(':');
        
        if(temp.length < 2){
            return null;
        }

        let result;
        
        let expire = Number(temp[0]);
        let type = temp[1];
        let val = decodeURIComponent(temp[2]);

        if(type === 'null'){
            result = null;
        }else if(type === 'undefined'){
            result = undefined;
        }else if(type === 'date'){
            result = new Date(JSON.parse(val));
        }else if(type === 'regexp'){
            result = new RegExp(val);
        }else if(type === 'string'){
            result = String(val);
        }else if(type === 'number'){
            result = Number(val);
        }else if(type === 'boolean'){
            result = !!Number(val);
        }else if(type === 'object'){
            result = JSON.parse(val);
        }else{
            result = val;
        }
        
        return {
            expire: expire,
            type: type,
            value: result
        };
    }
    
    ttl(key){
        let saveKey = Store.__genKey(this.db, key);

        let value = this.storage.getItem(saveKey);

        let result = Store.__parseValue(value);
        
        if(!result){
            return -1;
        }
        
        if(!result.expire){
            return -1;
        }
        
        let ttl = result.expire - Date.now();
        
        return ttl > 0 ? ttl : -1;
    }
    
    set(key, value, expire){
        this.storage.setItem(Store.__genKey(this.db, key), Store.__genValue(value, expire));
    }
    
    get(key){
        
        let saveKey = Store.__genKey(this.db, key);
        
        let value = this.storage.getItem(saveKey);
        
        let result = Store.__parseValue(value);
        
        if(!result){
            return null;
        }
        
        if(result.expire !== 0){
            let now = Date.now();
            
            if(result.expire < now){
                this.storage.removeItem(saveKey);
                return null;
            }
        }
        
        return result.value;
    }
    
    del(key){
        this.storage.removeItem(Store.__genKey(this.db, key));
    }
    
    has(key){
        return !!this.storage.getItem(Store.__genKey(this.db, key));
    }
    
    keys(){
        let temp = [];
        for(let i = 0; i < this.storage.length; i++){
            let key = this.storage.key(i);
            temp.push(Store.__parseKey(key));
        }
        return temp;
    }
    
    all(){
        let temp = [];
        for(let i = 0; i < this.storage.length; i++){
            let key = this.storage.key(i);
            let result = Store.__parseValue(this.storage.getItem(key));

            if(result.expire !== 0){
                let now = Date.now();

                if(result.expire < now){
                    this.storage.removeItem(key);
                    continue;
                }
            }
            
            temp.push({
                [Store.__parseKey(key)] : result.value
            });
        }
        return temp;
    }
    
    size(){
        return this.storage.length;
    }
    
    clear(){
        this.storage.clear();
    }
    
}

export {Store};

export default {
    install (Vue) {
        Vue.prototype.$storage = new Store(window.sessionStorage);
    }
};