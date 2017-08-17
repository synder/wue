/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function pad(str, length, padStr, direction) {
    str = (str == null) ? '' : str + '';

    length = ~~length;

    let padLen = 0;

    if (!padStr){
        padStr = ' ';
    } else if (padStr.length > 1){
        padStr = padStr.charAt(0);
    }

    let strRepeat = function (str, times) {
        if (times < 1) return '';
        let result = '';
        while (times > 0) {
            if (times & 1) {
                result += str;
            }
            times >>= 1;
            str += str;
        }
        return result;
    };

    switch (direction) {
        case 'right':
            padLen = length - str.length;
            return str + strRepeat(padStr, padLen);
        case 'both':
            padLen = length - str.length;
            return strRepeat(padStr, Math.ceil(padLen / 2)) + str + strRepeat(padStr, Math.floor(padLen / 2));
        default:
            padLen = length - str.length;
            return strRepeat(padStr, padLen) + str;
    }
};