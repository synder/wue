<template>
    <div @touchmove="onTouchMove">
        <transition name="wue-mask">
            <div class="weui-mask" @click="hideOnBlur && (currentValue = false)" v-show="currentValue"></div>
        </transition>
        <transition name="wue-dialog">
            <div :class="dialogClass" v-show="currentValue" :style="dialogStyle">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<style lang='less'>
    @import '../../styles/transition.less';
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-tips/weui-dialog.less';
</style>

<script>
    export default {
        name: 'wue-dialog',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            dialogClass: {
                type: String,
                default: 'weui-dialog'
            },
            hideOnBlur: Boolean,
            dialogStyle: Object,
            scroll: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                currentValue: false
            }
        },
        watch: {
            value: {
                handler: function (val) {
                    this.currentValue = val;
                },
                immediate: true
            },
            currentValue (val) {
                this.$emit(val ? 'on-show' : 'on-hide');
                this.$emit('input', val);
            }
        },
        methods: {
            onTouchMove: function (event) {
                !this.scroll && event.preventDefault()
            }
        }
    }
</script>
