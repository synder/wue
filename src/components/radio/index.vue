<template>
    <div>
        <div v-if="title" class="cells__title" v-html="title"></div>
        <div class="cells cells_radio">
            <label v-for="item in items" :key="item" class="cell check__label">
                <div class="cell__bd">
                    <p v-text="item"></p>
                </div>
                <div class="cell__ft">
                    <input type="radio" class="check" v-model="currentValue" :value="item">
                    <span class="wue-icon-radio-checked"></span>
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
    @import '../../styles/icon/icon.less';
    @import '../../styles/widget/cell/cell-global.less';
    @import '../../styles/widget/cell/check/radio.less';
    @import '../../styles/widget/cell/check/check_common.less';
</style>
