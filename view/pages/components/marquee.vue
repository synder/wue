<template>
    <div>
        <wue-marquee interval="2000">
            <wue-marquee-item><span style="color:#F00;">&nbsp;荐&nbsp;</span>荣耀V9 3月超级钜惠！</wue-marquee-item>
            <wue-marquee-item><span style="color:#F00;">&nbsp;荐&nbsp;</span>3.23京东超级品牌日格力盛典</wue-marquee-item>
            <wue-marquee-item><span style="color:#F00;">&nbsp;荐&nbsp;</span>京东服饰 早春新品低至7折</wue-marquee-item>
        </wue-marquee>

        <wue-marquee align="center" interval="2000">
            <wue-marquee-item>设置高度！设置高度！</wue-marquee-item>
            <wue-marquee-item>2.5秒自动切换！</wue-marquee-item>
            <wue-marquee-item>京东服饰 早春新品低至7</wue-marquee-item>
        </wue-marquee>

        <wue-marquee direction="down" align="right" height="50" interval="2000">
            <wue-marquee-item>
                向下滚动！向下滚动！<br/>
                向下滚动！向下滚动！<br/>
            </wue-marquee-item>
            <wue-marquee-item>
                内容居右！内容居右！<br>
                内容居右！内容居右！<br>
            </wue-marquee-item>
            <wue-marquee-item>
                京东服饰 早春新品低至7折 <br>
                京东服饰 早春新品低至7折 <br>
            </wue-marquee-item>
        </wue-marquee>
    </div>
</template>

<style lang='less' scoped>

</style>

<script>
    import WueMarquee from "../../../src/components/marquee/index";
    import WueMarqueeItem from "../../../src/components/marquee/item";
    export default {
        components: {
            WueMarqueeItem,
            WueMarquee},
        name: '',

        props: {},

        data(){
            return {};
        },

        computed: {},

        methods: {},

        watch: {},

        mounted(){

        }
    }
</script>