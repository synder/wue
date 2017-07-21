<template>
    <i class="weui-loading" style="{ 'fontSize': size + 'px', 'color': color }"></i>
</template>

<script>
    export default {
        name: 'wue-spinner',

        props: {
            size: {
                type: Number,
                default: 28
            },
            color: {
                type: String,
                default: '#ccc'
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/widget/weui-loading/weui-loading.less';
</style>
