<template>
    <span class="weui-badge" :class="classes" :style="style">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        name: 'wue-badge',
        props: {
            color:{
                type: String,
                default: '#F43530',
            },
        },
        
        data(){
            return {
                dot: false
            };
        },
        
        computed: {
            classes(){
                return {'weui-badge_dot': this.dot};
            },
            
            style(){
                return { 'background-color': this.color };
            }
        },
        
        mounted(){
            this.dot = !this.$slots.default;
        }
    }
</script>

<style lang="less">
    @import '../../styles/variable.less';
    @import "../../styles/widget/weui-tips/weui-badge.less";
</style>
