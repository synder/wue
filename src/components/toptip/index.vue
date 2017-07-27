<template>
    <div class="weui-toptips weui-toptips_warn" v-if="currentValue" v-html="message"></div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            message: String
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
  @import '../../styles/widget/weui-cell/weui-form/weui-form_common.less';

  .weui-toptips {
    display: block;
  }
</style>
