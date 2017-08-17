<template>
    <div>
        <div class="cells__title" v-if="title" :style="style" v-html="title"></div>
        <div class="cells">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-cells',

        props: {
            title: String | Number,
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
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/cell/cell-global.less';
</style>
