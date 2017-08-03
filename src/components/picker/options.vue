<template>
    <div class="weui-picker__group">
        <div class="weui-picker__mask"></div>
        <div class="weui-picker__indicator"></div>
        <div class="weui-picker__content" ref="wrapper">
            <div class="weui-picker__item" v-for="item in items" v-html="item"></div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/weui-picker/weui-picker.less';
</style>

<script>
    
    import Transform from '../../lib/transform/index';

    export default {
        name: 'wue-picker-options',
        
        props: {
            id: {
                type: String,
                required: true
            },
            value: String,
            init: String,
            items: Array,
        },
        
        
        data(){
            return {
                itemHeight: 34,
                visibleCount : 7, //可见选项个数
                currentValue: this.init,
            };
        },
        
        watch: {
            currentValue(val){
                this.$emit('selected', this.id, val);
            }
        },

        computed: {
            minTranslateY () {
                return this.itemHeight * (Math.ceil(this.visibleCount / 2) - this.items.length);
            },

            maxTranslateY () {
                return this.itemHeight * Math.floor(this.visibleCount / 2);
            },
        },

        methods: {
            translate2value (translate) {
                translate = Math.round(translate / this.itemHeight) * this.itemHeight;
                const index = -(translate - Math.floor(this.visibleCount / 2) * this.itemHeight) / this.itemHeight;
                return this.items[index];
            },
        },

        created () {
            this.touch = {
                startTime: 0,
                endTime: 0,
                startY: 0,
                tempY: 0,
                endY: 0,
                speedY:0,
                moving: false
            }
        },

        mounted () {
            const self = this;
            const wrapper = self.$refs.wrapper; //滑动框
            const element = self.$el;

            Transform(wrapper, true);

            const move = function (wrapper, touch) {
                touch.moving = true;
                wrapper.translateY = wrapper.translateY + touch.endY - touch.tempY;
                
                if(Math.abs(touch.speedY) < 10){
                    let translate = Math.ceil(wrapper.translateY / self.itemHeight) * self.itemHeight;
                    translate = Math.max(Math.min(translate, self.maxTranslateY), self.minTranslateY);
                    wrapper.translateY = translate;
                    touch.moving = false;
                    return  self.currentValue = self.translate2value(wrapper.translateY);
                }

                const requestAnimation = 
                    window.requestAnimationFrame  ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame || 
                    window.msRequestAnimationFrame;

                let handler = touch.speedY > 0 ? Math.ceil : Math.floor;
                let requestAnimationID;
                
                const step = function () {
                    if(touch.speedY === 0){
                        touch.moving = false;
                        wrapper.translateY = handler(wrapper.translateY / self.itemHeight) * self.itemHeight;
                        self.currentValue = self.translate2value(wrapper.translateY);
                    }else{
                        touch.speedY = touch.speedY > 0 ? touch.speedY - 1 : touch.speedY + 1;
                        let temp = wrapper.translateY + touch.speedY;
                        temp = Math.max(Math.min(temp, self.maxTranslateY), self.minTranslateY);
                        wrapper.translateY = temp;
                        requestAnimationID = requestAnimationFrame(step);
                    }
                };

                requestAnimationID = requestAnimation(step);
            };
            
            element.addEventListener('touchstart', function (event) {
                event.preventDefault();
                let touch = event.touches[0];
                if(self.touch.moving){
                    return;
                }

                self.touch = {
                    startTime: 0,
                    endTime: 0,
                    startY: 0,
                    tempY: 0,
                    endY: 0,
                    speedY:0
                };
                
                self.touch.startTime = Date.now();
                self.touch.startY = touch.clientY;
                self.touch.tempY = touch.clientY;
                self.touch.startTranslateY = wrapper.translateY;
            });

            element.addEventListener('touchmove', function (event) {
                event.preventDefault();
                
                if(self.touch.moving){
                    return;
                }

                let touch = event.changedTouches[0] || event.touches[0];
                
                let tempTranslateY = wrapper.translateY + touch.clientY - self.touch.tempY;

                tempTranslateY = tempTranslateY < self.minTranslateY ? self.minTranslateY : tempTranslateY;
                tempTranslateY = tempTranslateY > self.maxTranslateY ? self.maxTranslateY : tempTranslateY;

                wrapper.translateY = tempTranslateY;
                
                self.touch.tempY = touch.clientY;
            });

            element.addEventListener('touchend', function (event) {
                event.preventDefault();

                if(self.touch.moving){
                    return;
                }

                let touch = event.changedTouches[0] || event.touches[0];

                self.touch.endY = touch.clientY;
                self.touch.endTime = Date.now();
                self.touch.speedY = Math.round((self.touch.endY - self.touch.startY) / (self.touch.endTime - self.touch.startTime) * 30);
                
                move(wrapper, self.touch);
            });
        }
    }

</script>