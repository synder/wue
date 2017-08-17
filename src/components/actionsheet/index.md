## ActionSheet

> import { ActionSheet } from 'wue';


| 参数           | 类型          | 说明  | 可选值| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| type          | String |皮肤样式|ios, android	| ios|
| title         | String |标题|
| cancel        | String |取消菜单项文字|
| options       | Array  |菜单项| [{id:'1', text: '菜单'}]	|


| 事件           | 类型          | 说明  | 传递参数| 默认值|
| ------------- |:-------------:| -----:|-----:|-----:|
| click | Event| 点击单个项目时选择的| {id: '', text: ''}|


#指定皮肤样式
```
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
```