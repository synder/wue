<template>

    <div class="weui-cell weui-cell_switch">
        <div class="weui-cell__bd">
            <slot></slot>
        </div>
        <div class="weui-cell__ft">
            <label class="weui-switch-cp">
                <input class="weui-switch-cp__input"
                       :disabled="disabled"
                       @change="$emit('change', currentValue)"
                       v-model="currentValue"
                       type="checkbox">
                <div class="weui-switch-cp__box"></div>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-switch',

        props: {
            title: String | Number,
            disabled: Boolean,
            value: Boolean,
        },

        data () {
            return {
                currentValue: this.value
            }
        },

        watch: {
            value (val) {
                this.currentValue = val;
            },

            currentValue (val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-cell/weui-cell-global.less';
    @import '../../styles/widget/weui-cell/weui-switch.less';
</style>
