<template>
    <div>
        <div class="cells__title" v-if="title" v-html="title"></div>
        <div class="cells cells_form">
            <slot></slot>
        </div>
        <div class="cells__tips" v-if="tips" v-html="tips"></div>
    </div>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/cell/cell-global.less';
    @import '../../styles/widget/cell/form/form_common.less';
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