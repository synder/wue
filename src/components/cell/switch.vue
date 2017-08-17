<template>

    <div class="cell cell_switch">
        <div class="cell__bd">
            <slot></slot>
        </div>
        <div class="cell__ft">
            <label class="switch-cp">
                <input class="switch-cp__input"
                       :disabled="disabled"
                       @change="$emit('change', currentValue)"
                       v-model="currentValue"
                       type="checkbox">
                <div class="switch-cp__box"></div>
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
    @import '../../styles/widget/cell/cell-global.less';
    @import '../../styles/widget/cell/switch.less';
</style>
