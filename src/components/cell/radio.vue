<template>
    <div class="weui-cells weui-cells_radio">
        <label class="weui-cell weui-check__label" v-for="item in options" :for="name + item">
            <div class="weui-cell__bd" v-html="item">
            </div>
            <div class="weui-cell__ft">
                <input type="radio" class="weui-check" :name="name" v-model="currentValue" :value="item" :id="name + item">
                <span class="weui-icon-checked"></span>
            </div>
        </label>
    </div>
    
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/icon/weui-icon.less';
    @import '../../styles/widget/weui-cell/weui-cell-global.less';
    @import '../../styles/widget/weui-cell/weui-check/weui-radio.less';
    @import '../../styles/widget/weui-cell/weui-check/weui-check_common.less';
  
</style>

<script>

    import uuid from '../../lib/string/uuid.js';
    
    export default{
        name: 'wue-radio-cell',
        
        props: {
            value: String | Number | Boolean,
            options: Array
        },
        
        data(){
            return {
                currentValue: this.value,
                name: uuid()
            };
        },
        
        methods: {
          
        },
        
        watch: {
            currentValue (val) {
                this.$emit('input', val);
            },

            value (val) {
                this.currentValue = val;
            }
        }
        
        
    }
</script>