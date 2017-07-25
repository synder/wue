/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function (card) {

    card = card + '';

    let result = '';

    while (card.length > 4) {
        result = result + card.slice(0, 4) + ' ';
        card = card.substr(4);
    }

    if (card) {
        result += card;
    }

    return result;
};