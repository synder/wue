<template>
    <div class="weui-mask weui-animate-fade-in" v-if="currentValue">
        <slot></slot>
    </div>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-animate/weui-animate.less';
</style>

<script>
    export default{
        name: '',
        
        props: {
            value: Boolean
        },
        
        data(){
            return {
                currentValue: this.value
            }
        },
        
        watch: {
            currentValue(val){
                this.$emit('input', val);
            },
            
            value(val){
                this.currentValue = val;
            }
        }
    }
</script>