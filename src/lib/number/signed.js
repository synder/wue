/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function signed(number) {
    number = parseFloat(number);

    if(number > 0){
        return '+' + number;
    }else if(number < 0){
        return '-' + number;
    }else{
        return number + '';
    }
};