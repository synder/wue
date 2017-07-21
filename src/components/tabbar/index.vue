<template>
    <div class="weui-tabbar" :style="{ position: fixed ? 'fixed' : 'absolute' }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-tabbar',

        props: {
            value: String | Number,
            fixed: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-tab/weui-tabbar.less';
</style>
