/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function (number, n) {

    number = parseFloat(number) || 0;

    if(n){
        number = number.toFixed(n);
    }

    number = number + '';

    var temp = number.split('.');
    var decimal = temp.length > 1 ? temp[1] : '';
    var integer = temp[0];
    var result = '';

    while (integer.length > 3) {
        result = ',' + integer.slice(-3) + result;
        integer = integer.slice(0, integer.length - 3);
    }
    if (integer) {
        result = integer + result;
    }

    if (decimal) {
        result = result + '.' + decimal;
    }

    return result;
};