/**
 * @author synder on 2017/4/8
 * @copyright
 * @desc
 */


export default  function join(array, joiner) {
    if(!Array.isArray(array)){
        return '';
    }
    return array.join(joiner);
}