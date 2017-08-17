/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default function quote(str, quoteChar) {
    quoteChar = quoteChar || '"';
    return [quoteChar, str, quoteChar].join('');
};