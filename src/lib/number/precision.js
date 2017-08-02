/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */

export default function (num, x) {
    return Number.prototype.toPrecision.apply(num, x);
}