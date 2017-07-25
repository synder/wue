<template>
    <a :class="'weui-swiped-btn weui-swiped-btn_' + type">
        <slot></slot>
    </a>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/weui-cell/weui-cell-swiped.less';
</style>

<script>
    export default{
        name: 'wue-swipe-cell-button',
        
        props: {
            type: String
        },
        
        data(){
            return {}
        }
    }
</script>