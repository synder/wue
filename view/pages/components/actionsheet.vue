<template>
    <wue-actionsheet type="ios" @click="onClick" :options="options" cancel="取消" v-model="visible"></wue-actionsheet>
</template>

<style lang='less' scoped>

</style>

<script>
    import WueActionsheet from "../../../src/components/actionsheet/index";
    export default {
        components: {WueActionsheet},
        name: '',

        props: {},

        data(){
            return {
                visible: true,
                options: [
                    {id: 1, text: 'show'},
                    {id: 2, text: 'show1'},
                    {id: 3, text: 'show2'},
                    {id: 4, text: 'show3'},
                ]
            };
        },

        computed: {},

        methods: {
            onClick(item){
                console.log(item);
            }
        },

        watch: {},

        mounted(){

        }
    }
</script>