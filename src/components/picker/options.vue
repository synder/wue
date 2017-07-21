<template>
    <div class="weui-picker__group">
        <div class="weui-picker__mask"></div>
        <div class="weui-picker__indicator"></div>
        <div class="weui-picker__content" ref="wrapper">
            <div class="weui-picker__item" v-for="item in items" v-html="item"></div>
        </div>
    </div>
</template>

<style lang='less' rel="stylesheet/less">
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

            Transform(wrapper, true);

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
                self.dragState.velocityTranslate = self.dragState.currentTranslateY - self.dragState.prevTranslateY;

                self.dragState.prevTranslateY = self.dragState.currentTranslateY;
            });

            element.addEventListener('touchend', function (event) {
                event.preventDefault();
                self.isDragging = false;
                
                
                let momentumRatio = 7;
                let currentTranslate = wrapper.translateY;
                let duration = new Date() - self.dragState.start;

                let momentumTranslate;
                if (duration < 300) {
                    momentumTranslate = currentTranslate + self.dragState.velocityTranslate * momentumRatio;
                }

                self.$nextTick(function () {
                    let translate;
                    if (momentumTranslate) {
                        translate = Math.round(momentumTranslate / self.itemHeight) * self.itemHeight;
                    } else {
                        translate = Math.round(currentTranslate / self.itemHeight) * self.itemHeight;
                    }

                    translate = Math.max(Math.min(translate, self.maxTranslateY), self.minTranslateY);

                    wrapper.translateY = translate;

                    self.currentValue = self.translate2value(translate);
                    
                    self.$emit('change', self.id, self.currentValue);
                });
                
                self.dragState = {}
            });

            element.addEventListener('touchcancel', function (event) {
                event.preventDefault();
                self.isDragging = false;
                self.dragState = {};
            });
        }
    }

</script>