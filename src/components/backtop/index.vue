<template>
    <div class="wue-backtop" :style="style" @click.stop="backTop" v-show="show">
        <slot>
            <i class="icon-rocket" ></i>
        </slot>
    </div>
</template>

<script type="text/babel">
    
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
                default: false
            },
            color: {
                type: String,
                default: '#0BB20C'
            }
        },
        
        data() {
            return {
                show: this.value
            }
        },
        
        computed: {
            style(){
                return {
                    color: this.color
                };
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
            this.scrollView = window;

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

    @import "../../styles/base/reset.less";
    @import "../../styles/icon/icon.less";
  

    @base-zindex: 1;
    
    .wue-backtop {
        width: 3rem;
        height: 3rem;
        background-color: rgba(230, 230, 230, .85);
        position: fixed;
        .border-radius(50%);
        right: 5%;
        bottom: 5%;
        .display-flex();
        .flex-align-items(center);
        .flex-justify-content(center);
        z-index: @base-zindex * 1000;
        border: none;
        color: #0BB20C;
        font-size: 1.5rem;
    }
</style>
