/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */

export default  function encode (str) {
    if(!str){
        return '';
    }

    if(typeof str !== 'string'){
        str = str.toString ? str.toString() : JSON.stringify(str);
    }

    return encodeURIComponent(str);
};