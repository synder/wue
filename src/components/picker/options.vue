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
    
    //todo 实现值初始化和三级联动

    import Transform from 'css3transform';

    export default {
        name: 'wue-picker-options',
        
        props: {
            id: {
                type: String,
                required: true
            },
            value: String,
            items: Array,
        },
        
        
        data(){
            return {
                itemHeight: 34,
                visibleCount : 7, //可见选项个数
                currentValue: this.value,
                isDragging : false
            };
        },

        computed: {
            minTranslateY () {
                return this.itemHeight * (Math.ceil(this.visibleCount / 2) - this.items.length)
            },

            maxTranslateY () {
                return this.itemHeight * Math.floor(this.visibleCount / 2)
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
            this.dragState = {}
        },

        mounted () {
            const self = this;
            const wrapper = self.$refs.wrapper; //滑动框
            const element = self.$el;
            
            let ticker = null;

            Transform(wrapper, true);

            const move = function (step) {

                let direction;
                
                if(self.dragState.velocityTranslate > 0){
                    direction = 'up';
                }else if(self.dragState.velocityTranslate < 0){
                    direction = 'down';
                }

                let translate = Math.round(wrapper.translateY + self.dragState.velocityTranslate * 1);

                if(step === true){
                    translate = Math.round(wrapper.translateY / self.itemHeight) * self.itemHeight;
                }else{
                    if(self.dragState.velocityTranslate === 0) {
                        if(direction === 'up'){
                            translate = Math.ceil(wrapper.translateY / self.itemHeight) * self.itemHeight;
                        }else if(direction === 'down'){
                            translate = Math.floor(wrapper.translateY / self.itemHeight) * self.itemHeight;
                        }else{
                            translate = Math.round(wrapper.translateY / self.itemHeight) * self.itemHeight;
                        }
                    }
                }

                translate = Math.max(Math.min(translate, self.maxTranslateY), self.minTranslateY);

                wrapper.translateY = translate;

                if(self.dragState.velocityTranslate === 0){
                    if(ticker){
                        clearInterval(ticker);
                    }
                    self.currentValue = self.translate2value(translate);
                    self.$emit('change', self.id, self.currentValue);
                }

                if(direction === 'up'){
                    if(self.dragState.velocityTranslate > 0){
                        self.dragState.velocityTranslate -= 1;
                    }
                }else if(direction === 'down'){
                    if(self.dragState.velocityTranslate < 0){
                        self.dragState.velocityTranslate += 1;
                    }
                }

            };


            element.addEventListener('touchstart', function (event) {
                event.preventDefault();

                let touch = event.changedTouches[0] || event.touches[0];
                
                self.isDragging = true;
                self.dragState.start = new Date();
                self.dragState.startPositionY = touch.clientY;
                self.dragState.startTranslateY = wrapper.translateY;
            });

            element.addEventListener('touchmove', function (event) {
                event.preventDefault();

                let touch = event.changedTouches[0] || event.touches[0];

                const deltaY = touch.clientY - self.dragState.startPositionY;

                const tempTranslateY = self.dragState.startTranslateY + deltaY;

                if (tempTranslateY <= self.minTranslateY) {
                    wrapper.translateY = self.minTranslateY;
                } else if (tempTranslateY >= self.maxTranslateY) {
                    wrapper.translateY = self.maxTranslateY;
                } else {
                    wrapper.translateY = self.dragState.startTranslateY + deltaY;
                }
                
                self.dragState.currentPosifionY = touch.clientY;
                self.dragState.currentTranslateY = wrapper.translateY;
                self.dragState.velocityTranslate = (self.dragState.currentTranslateY - self.dragState.prevTranslateY) || 0;
                self.dragState.prevTranslateY = self.dragState.currentTranslateY;
            });

            element.addEventListener('touchend', function (event) {
                event.preventDefault();
                self.isDragging = false;
                if(Math.abs(self.dragState.velocityTranslate) < 20){
                    move(true);
                }else{
                    if(ticker){
                        clearInterval(ticker);
                    }
                    ticker = setInterval(function () {
                        move(false);
                    }, 30);
                }
            });

            element.addEventListener('touchcancel', function (event) {
                event.preventDefault();
                self.isDragging = false;
                self.dragState = {};
            });
        }
    }

</script>