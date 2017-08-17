<template>
    <div class="slider-box">
        <div class="slider">
            <div class="slider__inner" :style="{height: width + 'px'}" ref="runway">
                <div :style="{width: progress + '%', height: width + 'px'}" class="slider__track"></div>
                <div :style="{left: progress + '%'}" class="slider__handler" ref="thumb"></div>
            </div>
        </div>
        <div class="slider-box__value" v-if="showValueBox">
            <slot name="value-box">{{ value }}</slot>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: 'wue-slider',

        props: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            width: {
                type: Number,
                default: 3
            },
            step: {
                type: Number,
                default: 1
            },
            value: {
                type: Number
            },
            showValueBox: {
                type: Boolean,
                default: true
            },
            disabled: Boolean
        },
        
        watch:{
            width(newValue){
                if(newValue > 28){
                    this.width = 28;
                }
            },
            
        },

        computed: {
            progress () {
                const value = this.value;
                if (typeof value === 'undefined' || value === null) return 0;
                return Math.floor((value - this.min) / (this.max - this.min) * 100);
            }
        },

        mounted () {
            const self = this;
            const thumb = self.$refs.thumb; //滑块
            const runway = self.$refs.runway; //导轨

            const getStartPositionX = function () {
                return runway.getBoundingClientRect().left - thumb.getBoundingClientRect().left;
            };

            let startPositionX = 0;

            thumb.addEventListener('touchstart', function (event) {
                event.preventDefault();

                if (self.disabled) return;

                startPositionX = getStartPositionX();
            });

            thumb.addEventListener('touchmove', function (event) {
                event.preventDefault();

                let touch = event.changedTouches[0] || event.touches[0];
                
                if (self.disabled) return;

                const runWayBox = runway.getBoundingClientRect();
                const deltaX = touch.pageX - runWayBox.left - startPositionX;
                const stepCount = Math.ceil((self.max - self.min) / self.step);
                const newPositionX = (startPositionX + deltaX) - (startPositionX + deltaX) % (runWayBox.width / stepCount);

                let newProgress = newPositionX / runWayBox.width;

                if (newProgress < 0) {
                    newProgress = 0
                } else if (newProgress > 1) {
                    newProgress = 1
                }

                self.$emit('input', Math.round(self.min + newProgress * (self.max - self.min)));
            });
            
            thumb.addEventListener('touchend', function (event) {
                event.preventDefault();
                if (self.disabled) return;
                startPositionX = 0;
                self.$emit('change', self.value);
            });
            
            thumb.addEventListener('touchcancel', function (event) {
                event.preventDefault();
                startPositionX = 0
            });
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/slider/slider.less';
</style>
