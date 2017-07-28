<template>
    <input class="weui-input"
            :type="type"
            :placeholder="placeholder"
            :value="currentValue"
            :readonly="readonly"
            :number="type === 'number'"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            @input="handleInput">
</template>

<script>

    export default {
        name: 'wue-input',

        props: {
            value: String | Number,
            type: {
                type: String,
                default: 'text'
            },
            placeholder: String | Number,
            readonly: Boolean,
            disabled: Boolean
        },

        data () {
            return {
                currentValue: this.value
            }
        },

        mounted () {
           
        },

        methods: {
            handleInput (event) {
                this.currentValue = event.target.value
            },
            
            onFocus () {
                this.$emit('focus', this);
            },

            onBlur () {
                this.$emit('blur', this);
            },

            onChange () {
                this.$emit('change', this.currentValue);
            },
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

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-cell/weui-form/weui-form_common.less';
</style>
