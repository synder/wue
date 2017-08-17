<template>
    <div class="grids">
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
    @import '../../styles/widget/grid/grid.less';
</style>
