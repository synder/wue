/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function mean(array) {
    if (Array.isArray(array)) {
        let sum = array.reduce(function(prev, curr) {
            return prev + curr;
        }, 0);

        let len = array.length;
        
        if (len != 0) {
            return sum / len;
        } else {
            return 0;
        }
    } else {
        return array;
    }
};