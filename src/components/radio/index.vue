<template>
    <div>
        <div v-if="title" class="weui-cells__title" v-html="title"></div>
        <div class="weui-cells weui-cells_radio">
            <label v-for="item in items" :key="item" class="weui-cell weui-check__label">
                <div class="weui-cell__bd">
                    <p v-text="item"></p>
                </div>
                <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" v-model="currentValue" :value="item">
                    <span class="weui-icon-checked"></span>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-radio',

        props: {
            value: String | Number,
            title: String | Number,
            items: Array
        },

        data () {
            return {
                currentValue: this.value
            }
        },

        watch: {
            currentValue (val) {
                this.$emit('input', val);
                this.$emit('change', val);
            },

            value (val) {
                this.currentValue = val;
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/icon/weui-icon.less';
    @import '../../styles/widget/weui-cell/weui-cell-global.less';
    @import '../../styles/widget/weui-cell/weui-check/weui-radio.less';
    @import '../../styles/widget/weui-cell/weui-check/weui-check_common.less';
</style>
