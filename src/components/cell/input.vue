<template>
    <div class="cell" :class="{ 'cell_warn': !verification, 'cell_vcode': !!showVCode }">
        <div class="cell__hd">
            <label class="label" v-html="label" v-if="label">
            </label>
        </div>
        <div class="cell__bd">
            <input
                    class="input"
                    rel="input"
                    :type="type"
                    :placeholder="placeholder"
                    :value="currentValue"
                    :readonly="readonly"
                    :number="type === 'number'"
                    @keyup.13="onEnterKey"
                    @focus="onFocus"
                    @blur="onBlur"
                    @change="onChange"
                    @input="handleInput">
        </div>
        <div class="cell__ft">
            <i class="icon-warn" v-if="!verification"></i>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import button from '../button/index.vue';

    export default {
        components: {
            'wue-button': button,
        },

        name: 'wue-input-cell',

        props: {
            type: {
                type: String,
                default: 'text'
            },
            label: String | Number,
            placeholder: String | Number,
            value: String | Number,
            readonly: Boolean,
            disabled: Boolean,
            required: {
                type: Boolean,
                default: false
            },
            pattern: String,
            button: String | Number
        },

        data () {
            return {
                verification: true,
                currentValue: this.value,
                showVCode: false
            }
        },

        mounted () {
            this.showVCode = this.$slots.default && this.$slots.default.length > 0;
        },

        methods: {

            handleInput (event) {
                this.currentValue = event.target.value
            },

            onFocus () {
                this.$emit('focus');
            },

            onBlur () {
                this.validator();
                this.$emit('blur');
            },

            onChange () {
                this.$emit('change', this.currentValue);
            },

            onEnterKey(){
                this.$emit('enter', this.currentValue);
            },

            validator () {

                if (this.pattern) {
                    const reg = new RegExp(this.pattern)
                    if (!reg.test(this.currentValue)) {
                        this.verification = false;
                        return;
                    }
                }
                
                if (this.required && this.currentValue === '') {
                    this.verification = false;
                    return;
                }

                this.verification = true;
            }
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
    @import '../../styles/icon/icon.less';
    @import '../../styles/widget/cell/cell-global.less';
    @import '../../styles/widget/cell/form/form_common.less';
    @import '../../styles/widget/cell/form/vcode.less';
    
    .icon-warn{
        color: @weuiColorWarn;
    }
</style>
