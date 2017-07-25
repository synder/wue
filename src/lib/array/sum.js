/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function sum(list, base) {

    if (!Array.isArray(list)) {
        return Number(list);
    }

    let ret = base || 0;

    for (let i = 0; i < list.length; i++) {
        let val = list[i];
        if (typeof val === 'number') {
            ret = ret + val;
        } else {
            return NaN;
        }
    }

    return ret;
};