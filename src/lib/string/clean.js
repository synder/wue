/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function clean(str) {
    str = (str == null) ? '' : str + '';
    return str.trim().replace(/\s\s+/g, ' ');
};