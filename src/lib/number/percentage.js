/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function (number, n) {

    if (typeof number !== 'number') {
        number = parseFloat(number) || 0;
    }

    number = number * 100;

    if (n) {
        number = number.toFixed(n);
    }

    return number + '%';
};