<template>
    <div class="wue-scroll-tab-content-item">
        <strong class="wue-scroll-tab-content-title">{{label}}</strong>
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
    
    @import "../../styles/base/reset.less";

    @line-high-color: #B2B2B2;

    .bottom-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid @color;
        .scaleY(.5);
        .transform-origin(0 0);
    }
    
    .wue-scroll-tab-content-title {
        font-size: 1rem;
        font-weight: normal;
        color: #555;
        display: block;
        padding-bottom: .5rem;
        padding-top: .5rem;
        margin-bottom: .5rem;
        position: relative;
        z-index: 1;
        &:after {
            .bottom-line(@line-high-color);
        }
    }
</style>

<script type="text/babel">
    export default {
        name: 'wue-scroll-tab-item',
        props: {
            label: String | Number,
            icon: String,
            active: Boolean
        },
        mounted() {
            this.$parent.addItem({label: this.label, icon: this.icon, _uid: this._uid});
        }
    }
</script>
