
<template>
    <div class="cells_checkbox">
        <label class="cell check__label" v-for="item in options" :for="name + item">
            <div class="cell__hd">
                <input type="checkbox" class="check" :name="name" :id="name + item" v-model="currentValue" :value="item">
                <i class="icon-checkbox-checked"></i>
            </div>
            <div class="cell__bd" v-html="item">
            </div>
        </label>
    </div>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/icon/icon.less';
    @import '../../styles/widget/cell/cell-global.less';
    @import '../../styles/widget/cell/check/checkbox.less';
    @import '../../styles/widget/cell/check/check_common.less';
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
            },

            value (val) {
                this.currentValue = val;
            }
        }


    }
</script>