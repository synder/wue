<template>
    <wue-mask :value="value"></wue-mask>
</template>

<style lang='less' scoped>

</style>

<script>
    import WueMask from "../../../src/components/mask/index";
    export default {
        components: {WueMask},
        name: '',

        props: {},

        data(){
            return {
                value: true
            };
        },

        computed: {},

        methods: {},

        watch: {},

        mounted(){
            setInterval(function () {
                this.value = !this.value;
            }.bind(this), 2000);
        }
    }
</script>