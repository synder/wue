<template>
    <transition name="wue-mask">
        <div class="weui-toptips weui-toptips_warn" v-show="currentValue" v-html="message"></div>
    </transition>
</template>

<script>
    export default {
        
        name: 'wue-toptip',
        
        props: {
            value: {
                type: Boolean,
                default: false
            },
            message: String | Number
        },
        
        data(){
            return {
                currentValue: this.value
            }
        },
        
        methods: {
            show(){
                this.currentValue = true;
            },
            
            hide(){
                this.currentValue = false;
            }
        },
        
        watch:{
            value(val){
                this.currentValue = val;
            },

            currentValue(val){
                if(!val){
                    this.$emit('hidden');
                }
                this.$emit('input', val);
            }
        }
    }
</script>

<style scoped lang="less">
  @import '../../styles/base/reset.less';
  @import '../../styles/vue/transition.less';
  @import '../../styles/widget/weui-cell/weui-form/weui-form_common.less';

  .weui-toptips {
    display: block;
  }
</style>
