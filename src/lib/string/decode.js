/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function transform (str) {
    
    if(!str){
        return '';
    }
    
    if(typeof str !== 'string'){
        str = str.toString ? str.toString() : JSON.stringify(str);
    }
    
    try{
        return decodeURIComponent(str);
    }catch (ex){
        return str;
    }
};