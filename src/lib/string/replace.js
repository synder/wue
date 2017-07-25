/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function replace(str, s, r) {
    if(!str){
        return '';
    }
    
    str = str.toString ? str.toString() : JSON.stringify(str);
    
    return str.replace(s, r);
}