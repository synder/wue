<template>
    <div>
        <div class="weui-cells__title" v-if="title" v-html="title"></div>
        <div class="weui-cells weui-cells_form">
            <slot></slot>
        </div>
        <div class="weui-cells__tips" v-if="tips" v-html="tips"></div>
    </div>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-cell/weui-cell-global.less';
    @import '../../styles/widget/weui-cell/weui-form/weui-form_common.less';
</style>

<script>
    export default {
        name: 'wue-form',
        props: {
            title: String | Number,
            tips: String | Number
        },
        data () {
            return {
                active: false,
                verification: true,
                currentValue: this.value
            }
        },
    }
</script>