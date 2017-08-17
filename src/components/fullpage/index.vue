<template>
    <div style="overflow: hidden;">
        <div class="wue-full-page-box" :style="style" ref="box">
            <slot></slot>
        </div>
        <div class="wue-full-page-indicator" v-if="showIndicator">
            <div v-for="index in children" :class="{'active': index === active}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-fullpage',

        props: {
            direction: {
                type: Boolean,
                default: true
            },
            value: {
                type: Number,
                default: 0
            },
            indicator: Boolean,
            animation:{
                type: Number,
                default: 0.3
            }
        },

        data(){
            return {
                height: window.innerHeight || document.body.clientHeight,
                width: window.innerWidth || document.body.clientWidth,
                current: 0,
                children: [],
                active: this.value,
                showIndicator: !this.direction && this.indicator,
                duration: this.animation,
                touch: {
                    startX: 0,
                    startY: 0,
                    tempX: 0,
                    tempY: 0,
                    endX: 0,
                    endY: 0,
                }
            };
        },

        computed: {
            max(){
                let moveUnit = this.direction ? this.height : this.width;
                return -moveUnit * (this.children.length - 1);
            },
            
            style(){
                let transform, flexDirection;
                let width, height;
                if(this.direction){
                    transform = 'translate(0, '+ this.current +'px)';
                    width = this.width;
                    height = this.height  * this.children.length;
                    flexDirection = 'column';
                }else{
                    transform = 'translate('+ this.current +'px, 0)';
                    width = this.width * this.children.length;
                    height = this.height;
                    flexDirection = 'row';
                }
                
                let temp = {
                    width: width + 'px',
                    height: height + 'px',
                    transform: transform,
                    '-webkit-transform': transform,
                    '-moz-transform': transform,
                    '-ms-transform': transform,
                    '-o-transform': transform,
                    '-webkit-flex-direction': flexDirection,
                    '-moz-flex-direction': flexDirection,
                    '-ms-flex-direction': flexDirection,
                    '-o-flex-direction': flexDirection,
                    'flex-direction': flexDirection,
                    '-webkit-box-orient': flexDirection,
                    '-webkit-box-direction': flexDirection,
                    '-moz-box-orient': flexDirection,
                    '-moz-box-direction': flexDirection,
                };
                
                if(this.duration){
                    temp['transition-duration'] = this.duration + 's';
                    temp['-moz-transition-duration'] = this.duration  + 's';
                    temp['-webkit-transition-duration'] = this.duration + 's';
                    temp['-o-transition-duration'] = this.duration + 's';
                }
                
                return temp;
            }
        },

        methods: {

            activation(){
                this.current = -this.active * (this.direction ? this.height : this.width);
            },
           
            init(){
                const self = this;
                
                this.activation();

                self.$el.addEventListener("touchstart", function (event) {
                    event.preventDefault();
                    const touch = event.touches[0];

                    self.touch = {
                        startX: touch.clientX,
                        startY: touch.clientY,
                        tempX: touch.clientX,
                        tempY: touch.clientY,
                        endX: 0,
                        endY: 0,
                    };
                });

                self.$el.addEventListener("touchmove", function (event) {
                    

                    const touch = event.changedTouches[0] || event.touches[0];
                    
                    self.duration = null;

                    let moveX = touch.clientX - self.touch.tempX;
                    let moveY = touch.clientY - self.touch.tempY;

                    self.touch.tempX = touch.clientX;
                    self.touch.tempY = touch.clientY;

                    if(self.direction){
                        if (Math.abs(moveX) < Math.abs(moveY)) {
                            self.transform(moveY);
                        }
                    }else{
                        if (Math.abs(moveX) > Math.abs(moveY)) {
                            self.transform(moveX);
                        }
                    }
                });

                self.$el.addEventListener("touchend", function (event) {
                   
                    const touch = event.changedTouches[0] || event.touches[0];

                    self.duration = self.animation;

                    self.touch.endX = touch.clientX;
                    self.touch.endY = touch.clientY;

                    self.next();
                });
            },

            next(){

                let threshold = this.direction ? 0.08 : 0.1;
                
                let moveUnit = this.direction ? this.height : this.width;
                
                let result = this.current / moveUnit;
                
                let moveLength = this.direction ? this.touch.endY - this.touch.startY : this.touch.endX - this.touch.startX;
                
                let move = Math.abs(moveLength) / moveUnit;
                
                if(this.direction){
                    if(this.touch.endY > this.touch.startY){
                        result = move > threshold ? Math.ceil(result) : Math.floor(result);
                    }else{
                        result = move > threshold ? Math.floor(result) : Math.ceil(result);
                    }
                }else{
                    if(this.touch.endX > this.touch.startX){
                        result = move > threshold ? Math.ceil(result) : Math.floor(result);
                    }else{
                        result = move > threshold ? Math.floor(result) : Math.ceil(result);
                    }  
                }
                
                let temp = result * moveUnit;
                temp = temp > 0 ? 0 : temp;
                temp = temp < this.max ? this.max : temp;
                
                this.active = Math.abs(temp / moveUnit);
                
                this.current = temp;
            },
            

            transform(translate){
                this.current = Math.round(this.current + translate);
            },
        },

        watch: {
            active(val){
                this.$emit('input', val);
                this.activation();
            },
            
            value(val){
                val = val && parseInt(val) ? parseInt(val) : 0;
                val = val < 0 ? 0 : val;
                val = val > this.children.length - 1 ? this.children.length - 1 : val;
                this.active = val;
            }
        },

        mounted(){
            const self = this;
            
            self.$children.forEach(function (item, index) {
                self.children.push(index);
                item.width = self.width;
                item.height = self.height;
            });
            
            self.init();
        }
    }
</script>


<style lang='less' scoped>

    @import "../../styles/base/reset";

    body{
        overflow: hidden;
    }

    .wue-full-page-box {
        margin: 0;
        padding: 0;
        overflow: hidden;
        .flex-box();
    }

    .wue-full-page-indicator{
        .flex-box();
        position: absolute;
        bottom: 1.5rem;
        left: 25%;
        width: 50%;
        height: 1rem;

        div{
            .flex(1);
            width: 0;
            z-index: 10000;
            text-align: center;

            &:after{
                content: "";
                width: .4rem;
                height: .4rem;
                background: rgba(255,255,255,.5);
                border-radius: 50%;
                position: absolute;
            }

            &.active:after{
                background: rgba(255,255,255,.9);
            }
        }
    }
</style>