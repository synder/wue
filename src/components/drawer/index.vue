<template>
    <div class="wue-drawer">
        <div :style="{transform: `translate3d(${translateX}px, 0, 0)`}"
             class="wue-drawer-body">
            <slot></slot>
            <div class="wue-drawer-mask" :class="show ? 'wue-drawer-active' : ''" @click="hideMask"></div>
        </div>
        <div ref="drawer"
             class="wue-drawer-content"
             :style="drawerStyle"
             :class="[placement !=='left' ? 'drawer-right' : 'drawer-left', show ? 'wue-drawer-active' : '']">
            <slot name="drawer"></slot>
        </div>
    </div>
</template>

<script scoped>
    export default {
        name: 'wue-drawer',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            placement: {
                type: String,
                default: 'left'
            },
            showMode: {
                type: String,
                default: 'overlay'
            },
            drawerStyle: Object
        },
        data () {
            return {
                drawerWidth: 0,
                translateX: 0
            }
        },
        watch: {
            show: function () {
                if (!this.show) {
                    this.$emit('on-hide')
                } else {
                    this.$emit('on-show')
                }
                if (this.showMode === 'overlay') {
                    return
                }
                if (!this.show) {
                    this.translateX = 0
                } else {
                    this.translateX = this.placement === 'left' ? this.drawerWidth : -this.drawerWidth
                }
            }
        },
        methods: {
            hideMask () {
                this.$emit('update:show', false)
            }
        },
        mounted () {
            this.$nextTick(function () {
                this.drawerWidth = this.$refs.drawer.clientWidth
            })
        }
    }
</script>

<style lang="less" scoped>

    @import "../../styles/base/reset.less";

    .wue-drawer {
        display: block;
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .wue-drawer-content {
            background-color: #fff;
            position: absolute;
            top: 0;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            visibility: hidden;
            transition: transform ease-in-out 0.38s, visibility 0.38s;
            will-change: none;
        }

        .drawer-left {
            left: 0;
            transform: translateX(-100%);
        }

        .drawer-right {
            right: 0;
            transform: translateX(100%);
        }

        .wue-drawer-active {
            pointer-events: inherit;
            visibility: visible;
            transform: translateX(0%);
        }

        .wue-drawer-body {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .transition(transform ease-in-out 0.38s, visibility 0.38s);

            .wue-drawer-mask {
                z-index: 9999;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                visibility: hidden;
                opacity: 0;
                .transition(opacity ease-in-out 0.38s, visibility ease-in-out 0.38s);
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
    }
</style>