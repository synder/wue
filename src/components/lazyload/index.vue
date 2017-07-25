<!--懒加载图片-->
<template>
    <div class="wue-lazy-image-loader">
        <img :alt="alt" :src="href" :class="classes">
    </div>
</template>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    
    .wue-lazy-image-loader{
        min-height: 10px;
    }
</style>

<script>
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                default: ''
            },
            classes: String
        },

        data(){
            return {
                success: false,
                error: '',
                loading: '',
                href: ''
            }
        },

        computed: {
            
        },

        mounted(){
            document.addEventListener('touchmove', this.domIsVisible, false);
            document.addEventListener('scroll', this.domIsVisible, false);
            this.domIsVisible();
        },
        methods: {
            //判断一个元素是否在可视范围内
            domIsVisible: function () {
                const el = this.$el;

                let windowWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
                let windowHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;

                let scrollTop = window.pageYOffset  || document.body.scrollTop || document.documentElement.scrollTop;
                let scrollLeft = window.pageXOffset  || document.body.scrollLeft || document.documentElement.scrollLeft;

                let width = el.clientWidth;
                let height = el.clientHeight;
                let offsetTop = el.offsetTop;
                let offsetLeft = el.offsetLeft;

                let result = false;

                let startY = offsetTop - scrollTop;
                let startX = offsetLeft - scrollLeft;
                let endY = offsetTop - scrollTop + height;
                let endX = offsetLeft - scrollLeft + width;

                //判断由浏览器窗口矩形和该元素矩形是否相交，使用重心距离判断
                const getWeightPoint = function (star, end) {
                    return (star + end) / 2;
                };

                let windowWeightPointX = getWeightPoint(0, windowWidth);
                let windowWeightPointY = getWeightPoint(0, windowHeight);

                let elWeightPointY = getWeightPoint(startX, endX);
                let elWeightPointX = getWeightPoint(startY, endY);

                if(Math.abs(elWeightPointY - windowWeightPointX) < (windowWidth + width) / 2 &&
                    Math.abs(windowWeightPointY - elWeightPointX) < (windowHeight + height) / 2){
                    result = true;
                }
                
                if(result === true){
                    this.href = this.src;
                }
            }
            
        }
    }
</script>