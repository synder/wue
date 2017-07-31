<template>
    <div class="wue-sticky-box wue-sticky" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-sticky',
        props: {
            offset: {
                type: Number,
                default: 0
            }
        },

        computed: {
            style(){
                return {
                    top: this.offset + 'px'
                };
            }
        },

        methods: {
            supportSticky () {
                let prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
                let stickyStyle = '';
                for (let i = 0; i < prefixTestList.length; i++) {
                    stickyStyle += 'position:' + prefixTestList[i] + 'sticky';
                }
                let div = document.createElement('div');
                div.style.cssText = 'display:none' + stickyStyle;
                document.body.appendChild(div);
                let isSupport = /sticky/i.test(window.getComputedStyle(div).position);
                document.body.removeChild(div);
                div = null;
                return isSupport;
            },
        },

        mounted () {

            if (this.supportSticky()) {
                return;
            }

            const self = this;
            const navOffsetY = self.$el.offsetTop - self.offset;

            const scrollHandler = function () {
                let distance = document.body.scrollTop;
                if (distance >= navOffsetY) {
                    self.$el.classList.add('wue-fixed');
                } else {
                    self.$el.classList.remove('wue-fixed');
                }
            };

            window.addEventListener('scroll', scrollHandler);
        },
    }
</script>

<style lang="less" scoped>

    .wue-sticky-box {
        z-index: 500;
    }

    .wue-sticky {
        width: 100%;
        position: sticky;
    }

    .wue-fixed {
        width: 100%;
        position: fixed;
    }
</style>
