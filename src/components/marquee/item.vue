<template>
    <div class="wue-marquee-item">
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
    @import "../../styles/base/reset.less";

    .wue-marquee-item {
        height: inherit;
        .flex();
        .flex-align-items(center);
        .flex-justify-content(inherit);
    }
</style>

<script type="text/babel">
    export default {
        name: 'wue-marquee-item',
        mounted() {
            this.$parent.init();
        }
    }
</script>
