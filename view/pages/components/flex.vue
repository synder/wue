<template>
    <wue-flex :guter="2">
        <wue-flex-item>1</wue-flex-item>
        <wue-flex-item>1</wue-flex-item>
        <wue-flex-item>1</wue-flex-item>
        <wue-flex-item>1</wue-flex-item>
    </wue-flex>
</template>

<style lang='less' scoped>

</style>

<script>
    import WueFlex from "../../../src/components/flex/index";
    import WueFlexItem from "../../../src/components/flex/item";
    export default {
        components: {
            WueFlexItem,
            WueFlex},
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