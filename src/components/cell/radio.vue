<template>
    <div class="cells cells_radio">
        <label class="cell check__label" v-for="item in options" :for="name + item">
            <div class="cell__bd" v-html="item">
            </div>
            <div class="cell__ft">
                <input type="radio" class="check" :name="name" v-model="currentValue" :value="item" :id="name + item">
                <span class="icon-radio-checked"></span>
            </div>
        </label>
    </div>
    
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/icon/icon.less';
    @import '../../styles/widget/cell/cell-global.less';
    @import '../../styles/widget/cell/check/radio.less';
    @import '../../styles/widget/cell/check/check_common.less';
  
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