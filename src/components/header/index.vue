<template>
    <header class="wue-header" :class="{ 'is-fixed': fixed }" @click.stop="$emit('headerClick')"
            :style="{ 'background-color': background }">
        <div class="wue-header-btn left">
            <slot name="left"></slot>
        </div>
        <div class="wue-header-title">
            <slot>
                <span v-text="title"></span>
            </slot>
        </div>
        <div class="wue-header-btn right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'wue-header',

        props: {
            title: String | Number,
            fixed: {
                type: Boolean,
                default: true
            },
            background: {
                type: String,
                default: '#1AAD19'
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    
    @headerHeight: 45px;

    .wue-header {
        .flex();
        .flex-align-items(center);
        .box-sizing(border-box);
        width: 100%;
        height: @headerHeight;
        padding: 0 10px;
        margin: 0;
        color: white;
        position: relative;
        white-space: nowrap;

        .left, .right {
            display: block;
            overflow: hidden;
            float: left;
            font-weight: 100;
            height: @headerHeight;
            line-height: @headerHeight - 2;
        }

        .wue-header-title {
            font-size: @headerHeight - 25;
            font-weight: 100;
            text-align: center;
            flex: 1;
        }

    }

    .is-fixed {
        position: fixed;
        left: 0;
        top: 0;
    }
</style>
