/**
 * @author synder on 2017/7/25
 * @copyright
 * @desc
 */


const webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
const osx = !!ua.match(/\(Macintosh\; Intel /);
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
const webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
const wp = ua.match(/Windows Phone ([\d.]+)/);
const touchpad = webos && ua.match(/TouchPad/);
const kindle = ua.match(/Kindle\/([\d.]+)/);
const silk = ua.match(/Silk\/([\d._]+)/);
const blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
const bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
const rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
const playbook = ua.match(/PlayBook/);
const chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
const firefox = ua.match(/Firefox\/([\d.]+)/);
const firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/);
const ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/);
const webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);
const safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);