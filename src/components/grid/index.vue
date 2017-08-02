<template>
    <div class="weui-grids">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-grid',
        props: {
            rows: {
                type: Number,
                default: 3
            }
        }
    }
</script>
<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-grid/weui-grid.less';
</style>
