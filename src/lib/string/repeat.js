/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */
export default function repeat(str, n) {
    n = n ? Number(n) : 0;
    if(n != n){ // NAN
        n = 0;
    }

    n = Math.floor(n);

    if(n <= -1){
        n = 0;
    }

    str = '' + str;

    let ret = '';
    while(n !== 0){
        if(n & 1 === 1){
            ret += str;
        }
        str += str;
        n >>>= 1;
    }
    return ret;
};