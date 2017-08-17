/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function split(str, separator) {
    separator = separator || '';
    if (typeof str === 'string') {
        return str.split(separator);
    } else {
        return str;
    }
}
