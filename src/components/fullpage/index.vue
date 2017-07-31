<template>
    <div class="wue-full-page-box" :style="style">
       <slot></slot>
    </div>
</template>

<style lang='less' scoped>
    
    @import "../../styles/base/reset";
    
    .wue-full-page-box {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        display: block;
        .translate3d(0px, 0px, 0px);
        .transition(all 1000ms ease);
        overflow-x: hidden;
        overflow-y: hidden;
    }
</style>

<script>
    export default {
        name: 'wue-fullpage',

        props: {
            direction: {
                type: Boolean,
                default: true
            },
            
            value: {
                type: String
            }
        },

        data(){
            return {
                height: window.innerHeight || document.body.clientHeight,
                width: window.innerWidth || document.body.clientWidth,
                active: this.value,
                items: 1,
                uuid: []
            };
        },

        computed: {
            style(){
                
                let temp = {};
                
                if(this.direction){
                    temp.height = this.height * this.items + 'px';
                    temp.width = this.width + 'px';
                }else{
                    temp.height = this.height + 'px';
                    temp.width = this.width * this.items + 'px';
                }
                
                return temp;
            }
        },

        methods: {
            init(){
                this.items = this.$children.length;
            },
            
            nextPage(){
                this.$el.scrollTop = this.height;
                console.log(this.$el.scrollTop);
            },
            
            prevPage(){
                if((this.$el.scrollTop - this.height) >= 0){
                    this.$el.scrollTop -= this.height;
                }
            }
        },

        watch: {},

        mounted(){
            const self = this;
            const element = self.$el;
            
            self.init();
            
            let startX, startY, moveEndX, moveEndY;

            element.addEventListener('touchstart', function (event) {
                event.preventDefault();
                let touch = event.changedTouches[0] || event.touches[0];

                startX = touch.clientX;
                startY = touch.clientY;
            });

            element.addEventListener('touchmove', function (event) {
                event.preventDefault();

            });

            element.addEventListener('touchend', function (event) {
                event.preventDefault();
                let touch = event.changedTouches[0] || event.touches[0];

                moveEndX = touch.clientX;
                moveEndY = touch.clientY;

                let offsetX = moveEndX - startX;
                let offsetY = moveEndY - startY;
                
                return  self.nextPage();
                
                if(self.direction){
                    if(Math.abs(offsetX) > 100){
                        if(offsetX > 0){
                            self.prevPage();
                        }else{
                            self.nextPage();
                        }
                    }else{

                    }
                }else{
                    if(Math.abs(offsetY) > 100){
                        if(offsetY > 0){
                            self.prevPage();
                        }else{
                            self.nextPage();
                        }
                    }else{

                    }
                }

            });
        }
    }
</script>