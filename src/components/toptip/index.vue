<template>
    <transition name="wue-mask">
        <div class="toptips toptips_warn" v-show="currentValue" v-html="message"></div>
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
                    this.$emit('hidden', this);
                }
                this.$emit('input', val);
            }
        }
    }
</script>

<style scoped lang="less">
  @import '../../styles/base/reset.less';
  @import '../../styles/vue/transition.less';
  @import '../../styles/widget/cell/form/form_common.less';

  .toptips {
    display: block;
  }
</style>
