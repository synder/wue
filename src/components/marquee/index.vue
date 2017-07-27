
<template>
    <div class="wue-marquee" :style="{height: height + 'px'}">
        <div class="wue-marquee-box" :style="styles" :class="'align-' + align">
            <div class="wue-marquee-item" v-html="lastItem"></div>
            <slot></slot>
            <div class="wue-marquee-item" v-html="firstItem"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'wue-marquee',
        data() {
            return {
                timer: null,
                index: 1,
                totalNum: 0,
                firstItem: '',
                lastItem: '',
                styles: {
                    transform: 0,
                    transitionDuration: 0
                }
            }
        },
        props: {
            height: {
                type: Number | String,
                default: 30
            },
            speed: {
                type: Number | String,
                default: 500
            },
            interval: {
                type: Number | String,
                default: 3000
            },
            align: {
                type: String,
                validator(value) {
                    return ['left', 'center', 'right'].indexOf(value) > -1;
                },
                default: 'left'
            },
            direction: {
                type: String,
                validator(value) {
                    return ['up', 'down'].indexOf(value) > -1;
                },
                default: 'up'
            }
        },
        methods: {
            init() {
                this.destroy();

                this.items = this.$children.filter(item => item.$options.name === 'wue-marquee-item');

                this.totalNum = this.items.length;

                if (this.totalNum <= 0) return;

                this.firstItem = this.items[0].$el.innerHTML;
                this.lastItem = this.items[this.totalNum - 1].$el.innerHTML;

                this.setTranslate(0, -this.height);

                this.autoPlay();
            },
            autoPlay() {
                this.timer = setInterval(() => {
                    if (this.direction == 'up') {
                        this.setTranslate(this.speed, -(++this.index * this.height));
                        if (this.index >= this.totalNum) {
                            this.index = 0;
                            setTimeout(() => {
                                this.setTranslate(0, 0);
                            }, this.speed);
                        }
                    } else {
                        this.setTranslate(this.speed, -(--this.index * this.height));
                        if (this.index <= 0) {
                            this.index = this.totalNum;
                            setTimeout(() => {
                                this.setTranslate(0, -this.totalNum * this.height);
                            }, this.speed);
                        }
                    }
                }, this.interval);
            },
            setTranslate(speed, translate) {
                this.styles.transitionDuration = speed + 'ms';
                this.styles.transform = 'translate3d(0, ' + translate + 'px, 0)';
            },
            destroy() {
                clearInterval(this.timer);
            }
        },
        destroyed() {
            this.destroy();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../styles/base/reset.less";
    
    .wue-marquee {
        overflow: hidden;
        width: 100%;
        background-color: #fff;
    }

    .wue-marquee-box {
        
        height: inherit;
        
        &.align-left {
            .flex-justify-content(flex-start);
        }
        &.align-right {
            .flex-justify-content(flex-end);
        }
        &.align-center {
            .flex-justify-content(center);
        }
    }

</style>
