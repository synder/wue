<template>
    <div style="padding: 1rem;">
        <wue-button type="primary" @click="alert">alert</wue-button>
        <wue-button background="#456554" color="#fff" @click="confirm">confirm</wue-button>
        <wue-button type="warn" @click="loading">loading</wue-button>
        <wue-button type="plain" @click="toast">toast</wue-button>
        
        <wue-dialog v-model="show" title="测试">
        </wue-dialog>
    </div>
</template>

<style lang='less' scoped>

</style>

<script>
    import WueButton from "../../../src/components/button/index";
    import WueDialog from "../../../src/components/dialog/index";
    export default {
        components: {
            WueDialog,
            WueButton},
        name: '',

        props: {},

        data(){
            return {
                show: true
            };
        },

        computed: {},

        methods: {
            alert(){
                this.$alert('你好', '弹窗', function (self) {
                    console.log(self);
                });
            },
            confirm(){
                this.$confirm('你好', '弹窗', function (result, self) {
                    console.log(result);
                });
            },
            loading(){
                let temp = this.$loading('加载中');
                
                setTimeout(function () {
                    temp.hide();
                }, 2000);
            },
            toast(){
                this.$toast('加载完成');
            }
        },

        watch: {},

        mounted(){

        }
    }
</script>