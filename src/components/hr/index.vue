<template>
    <p class="wue-hr"></p>
</template>

<script>
    export default {
        name: 'vue-hr'
    }
</script>

<style scoped lang="less">

    @import '../../styles/base/mixin/setOnepx.less';

    .wue-hr {
        padding-top: 15px;
        margin-bottom: 15px;
        position: relative;
    }

    :before {
        .setBottomLine()
    }
</style>