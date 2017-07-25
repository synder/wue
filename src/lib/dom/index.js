
const isIOS = function () {
    let userAgent = window.navigator && window.navigator.userAgent || '';
    return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

const isAndroid = function () {
    let userAgent = window.navigator && window.navigator.userAgent || '';
    return /(Android);?[\s/]+([\d.]+)?/.test(userAgent);
};

const isWechat = function () {
    let userAgent = window.navigator && window.navigator.userAgent || '';
    return /micromessenger/i.test(userAgent);
};

const pageScroll = {
    locked: false,
    lock: function () {
        if (this.locked){
            return;
        }
        this.locked = true;
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    },
    unlock: function () {
        this.locked = false;
        document.removeEventListener('touchmove', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }
};


const isColor = function (value) {
    const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
    const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
    const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

    return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
};

const getScrollView = function (el) {
    let currentNode = el;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }
    return window;
};

const checkInView = function (scrollView, el) {
    const contentHeight = scrollView === window ? document.body.offsetHeight : scrollView.offsetHeight;
    const contentTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top;

    const post = el.getBoundingClientRect().top - contentTop;
    const postOffset = post + el.offsetHeight;

    return (post >= 0 && post < contentHeight) || (postOffset > 0 && postOffset <= contentHeight);
};

const hasClass = function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
};

const addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className === '' ? cls : ele.className + ' ' + cls;
    }
};

const removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
};

const scrollTop = function (el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }

    scroll(from, to, step);
};


export {pageScroll, isIOS, isAndroid, isWechat, isColor, getScrollView, checkInView, addClass, removeClass, scrollTop};
