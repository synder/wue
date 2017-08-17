/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function fixed(num, x) {
    return Number.prototype.toFixed.apply(num, x);
}