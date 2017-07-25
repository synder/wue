<template>
    <div class="wue-swipe-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-swipe-item',

        mounted () {
            this.$parent && this.$parent.swipeItemCreated(this)
        },

        destroyed () {
            this.$parent && this.$parent.swipeItemDestroyed(this)
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
</style>
