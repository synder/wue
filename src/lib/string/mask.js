/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function mask(str, mask, start, len) {

    if(!str){
        return '';
    }else{
        str = str + '';
    }

    if(!mask){
        return '';
    }else{
        mask = mask + '';
    }

    let res = '';
    let end = 0;

    if(start < 0){
        end = start + str.length;
        start = end < len ? 0 : end - len;
    }else{
        start = start - 1;
        end = start + len - 1;
    }

    for(let i = 0; i < str.length; i++){
        if(i < start || i > end){
            res += str[i];
        }else{
            res += mask;
        }
    }

    return res;
};