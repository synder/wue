<template>
    <div v-show="show" @click.stop="backTop">
        <slot>
            <div class="wue-backtop">
                <i class="weui-icon-arrow-up-l"></i>
            </div>
        </slot>
    </div>
</template>

<script type="text/babel">

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

    export default {
        name: 'wue-backtop',
        
        props: {
            value: {
                type: Boolean,
                default: true
            }
        },
        
        data() {
            return {
                show: this.value
            }
        },
        methods: {
            backTop() {
                const top = this.scrollView === window ? document.body.scrollTop : this.scrollView.scrollTop;
                scrollTop(this.scrollView, top, 0);
            },
            scrollHandler() {
                let offsetTop = window.pageYOffset;
                let offsetHeight = window.innerHeight;

                if (this.scrollView !== window) {
                    offsetTop = this.scrollView.scrollTop;
                    offsetHeight = this.scrollView.offsetHeight;
                }

                this.show = offsetTop >= offsetHeight / 2;
            },
            throttle(method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(() => {
                    method.call(context);
                }, 100);
            },
            throttledCheck() {
                this.throttle(this.scrollHandler);
            }
        },
        mounted() {
            this.scrollView = getScrollView(this.$el);

            this.scrollView.addEventListener('scroll', this.throttledCheck, false);
            this.scrollView.addEventListener('resize', this.scrollHandler, false);
        },
        destroyed() {
            this.scrollView.removeEventListener('scroll', this.throttledCheck, false);
            this.scrollView.removeEventListener('resize', this.scrollHandler, false);
        }
    }
</script>

<style lang="less" scoped>
    
    @import "../../styles/icon/wue-icon.less";

    @base-zindex: 1;
    
    .wue-backtop {
        width: 3rem;
        height: 3rem;
        background-color: rgba(230, 230, 230, .85);
        position: fixed;
        border-radius: 50%;
        right: 5%;
        bottom: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: @base-zindex * 1000;
        border: none;
        color: #0BB20C;
        font-size: 1.5rem;
    }
</style>
