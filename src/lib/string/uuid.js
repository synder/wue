/**
 * @author synder on 2017/4/19
 * @copyright
 * @desc
 */


export default function uuid() {
    const str = function () {
        return (((1 + Math.random()) * 0x10000) | 0 ).toString(16);
    };
    return str() + str() + str() + str() + str();
};