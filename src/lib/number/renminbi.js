/**
 *
 * 12345 => $12,345.00
 *
 * @param {Number} money
 */
export default function (money) {

    let number = String(money);

    number = number.split('.')[0];

    const NUM = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "扒", "玖", "拾"],
        BASE_UNIT = ["", "拾", "佰", "仟"],
        ADVANCE_UNIT = ["", "萬", "亿", "兆"];

    let last = number.length % 4;

    let temp = [];

    for(let i = 0; i < number.length; i++){

        let index = 0;

        if(last > 0){
            index = Math.floor((i + (4 - last)) / 4);
        }else{
            index = Math.floor(i / 4);
        }

        if(!temp[index]){
            temp[index] = [];
        }

        if(index === 0){
            if(temp[index].length === 0){
                if(number[i] !== '0'){
                    temp[index].push(NUM[number[i]]);
                }
            }else{
                temp[index].push(NUM[number[i]]);
            }
        }else{
            temp[index].push(NUM[number[i]]);
        }

    }

    let result = '';

    while (temp[0].length === 0){
        temp = temp.slice(1);
    }

    for(let j = 0; j < temp.length; j++){
        for(let k = 0, len = temp[j].length; k < len; k++){
            temp[j][k] = temp[j][k] === NUM[0] ? temp[j][k] : temp[j][k] + BASE_UNIT[len - k - 1];
            if(k === 3 && temp[j][k] === NUM[0]){
                temp[j][k] = '';
            }
        }

        result += temp[j].join('') + ADVANCE_UNIT[temp.length - j - 1];
    }

    result = result.replace(/零{3}萬/g, '');
    result = result.replace(/零{3}亿/g, '');
    result = result.replace(/零{3}兆/g, '');
    result = result.replace(/零{1,2}萬/g, '萬');
    result = result.replace(/零{1,2}亿/g, '亿');
    result = result.replace(/零{1,2}兆/g, '兆');
    result = result.replace(/零+/g, '零');
    result = result.replace(/零$/g, '');

    return result;
};