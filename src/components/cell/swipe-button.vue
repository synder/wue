<template>
    <a :class="'swiped-btn swiped-btn_' + type" :style="style">
        <slot></slot>
    </a>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/cell/cell-swiped.less';
</style>

<script>
    export default{
        name: 'wue-swipe-cell-button',
        
        props: {
            type: String,
            background: {
                type: String
            }
        },
        
        computed: {
            style(){
                return {
                    background: this.background
                };
            }
        },
        
        data(){
            return {}
        }
    }
</script>