
<template>
    <div class="weui-cells_checkbox">
        <label class="weui-cell weui-check__label" v-for="item in options" :for="name + item">
            <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check" :name="name" :id="name + item" v-model="currentValue" :value="item">
                <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd" v-html="item">
            </div>
        </label>
    </div>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
    @import '../../styles/widget/weui-cell/weui-cell-global.less';
    @import '../../styles/widget/weui-cell/weui-check/weui-checkbox.less';
    @import '../../styles/widget/weui-cell/weui-check/weui-check_common.less';
</style>

<script>
    
    import uuid from '../../lib/string/uuid.js';
    
    export default{
        name: 'wue-checkbox-cell',

        props: {
            value: Array,
            options: Array
        },

        data(){
            return {
                currentValue: [],
                name: uuid()
            };
        },

        methods: {
            
        },

        watch: {
            currentValue (val) {
                this.$emit('input', val);
                
                console.log(val);
            },

            value (val) {
                this.currentValue = val;
            }
        }


    }
</script>