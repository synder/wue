/**
 * @author synder on 2017/4/22
 * @copyright
 * @desc
 */


export function checkWebStorage() {
    if(!(window.localStorage && window.sessionStorage)){
        return alert('请更换最新的chrome浏览器');
    }
}