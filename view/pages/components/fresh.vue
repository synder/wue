<template>
    <wue-pull-fresh>
        <div class="content"></div>
    </wue-pull-fresh>
</template>

<style lang='less' scoped>
    .content{
        height: 200px;
        background: red;
    }
</style>

<script>
    import WuePullFresh from "../../../src/components/fresh/index";
    export default {
        components: {WuePullFresh},
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