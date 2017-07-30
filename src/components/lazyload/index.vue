<template>
    <div class="wue-lazy-image-loader">
        <img :alt="alt" :src="href" :class="classes" :style="style">
    </div>
</template>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    
    .wue-lazy-image-loader{
        height: 100%;
        width: 100%;
        border: none;
        
        img{
            width: 100%;
            border: none;
            .transition(opacity .3s ease);
        }
    }
</style>

<script>
    export default {
        name: 'wue-lazy-image',
        props: {
            src: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                default: ''
            },
            classes: String,
            placeholder:{
                type: String,
                default: 'data:image/png;base64,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'
            }
        },

        data(){
            return {
                success: false,
                error: null,
                loading: null,
                href: null,
                running: false,
                windowWidth: window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
                windowHeight: window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
            }
        },

        computed: {
            windowWeightPointX(){
                return  this.windowWidth / 2;
            },

            windowWeightPointY(){
                return  this.windowHeight / 2;
            },
            
            style(){
                let temp = {};
                
                if(this.placeholder){
                    temp.background = 'url(' + this.placeholder + ') no-repeat 50%';
                    temp.backgroundSize = '50%';
                }
                
                if(!this.href){
                    temp.height = '100%';
                }
                
                return temp;
            }
        },
        
        watch:{
            windowWidth(){
                this.domIsVisible();
            },

            windowHeight(){
                this.domIsVisible();
            }
        },

        mounted(){
            const self = this;
            self.domIsVisible();
            document.addEventListener('scroll', this.domIsVisible, false);
            window.onresize = function () {
                self.windowWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
                self.windowHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
            };
        },
        methods: {

            getPosition(el) {
                let left = 0, top = 0;
                let width = el.clientWidth, height = el.clientHeight;

                while (el) {
                    left += el.offsetLeft ? el.offsetLeft : 0;
                    top += el.offsetTop ? el.offsetTop : 0;
                    el = el.parentNode;
                }

                return {
                    left: left,
                    top: top,
                    width: width,
                    height: height
                };
            },
            
            //判断一个元素是否在可视范围内
            domIsVisible: function () {
                
                if(this.running){
                    return;
                }

                this.running = true;
                
                const el = this.$el;

                let scrollTop = window.pageYOffset  || document.body.scrollTop || document.documentElement.scrollTop;
                let scrollLeft = window.pageXOffset  || document.body.scrollLeft || document.documentElement.scrollLeft;
                
                let temp = this.getPosition(el);
                
                let offsetTop = temp.top;
                let offsetLeft = temp.left;
                let width = temp.width;
                let height = temp.height;
                
                let startY = offsetTop - scrollTop; //坐标转换
                let startX = offsetLeft - scrollLeft; //坐标转换

                //判断由浏览器窗口矩形和该元素矩形是否相交，使用重心距离判断
                let elWeightPointX = startX + width / 2;
                let elWeightPointY = startY + height / 2;
                
                let xIn = Math.abs(elWeightPointX - this.windowWeightPointX) < this.windowWidth;
                let yIn = Math.abs(elWeightPointY - this.windowWeightPointY) < this.windowHeight;

                let result = xIn && yIn;

                this.running = false;
                
                if(result === true){
                    this.href = this.src;
                }
            }
            
        }
    }
</script>