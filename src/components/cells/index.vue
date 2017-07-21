<template>
    <div>
        <div class="weui-cells__title" v-if="title" :style="style" v-html="title"></div>
        <div class="weui-cells">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-cells',

        props: {
            title: String,
            color: String,
            background: String
        },

        computed: {
            style(){
                let temp = {};
                
                if(this.color){
                    temp.color = this.color;
                }
                
                if(this.background){
                    temp.backgroundColor = this.background;
                }
                
                return temp;
            }
        },
    }
</script>

<style scoped lang="less">
    @import '../../styles/widget/weui-cell/weui-cell-global.less';
</style>
