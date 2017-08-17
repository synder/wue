<template>
    <div @touchmove="onTouchMove">
        <transition name="wue-mask">
            <div class="weui-mask" @click="hideOnBlur && (currentValue = false)" v-show="currentValue"></div>
        </transition>
        <transition name="wue-dialog">
            <div :class="dialogClass" :style="dialogStyle" v-show="currentValue">
                <slot>
                    <div class="weui-dialog__hd" v-if="title">
                        <slot name="title">
                            <strong class="weui-dialog__title" v-html="title"></strong>
                        </slot>
                    </div>
                    <div class="weui-dialog__bd">
                        <slot name="content"></slot>
                    </div>
                    <div class="weui-dialog__ft">
                        <slot name="footer">
                            <a class="weui-dialog__btn weui-dialog__btn_default" @click.prevent.stop="confirm">确认</a>
                        </slot>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<style lang='less'>
    @import "../../styles/base/reset.less";
    @import '../../styles/vue/transition.less';
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
            title: String,
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
                this.$emit(val ? 'show' : 'hide');
                this.$emit('input', val);
            }
        },
        methods: {
            onTouchMove: function (event) {
                !this.scroll && event.preventDefault()
            },
            confirm: function () {
                this.currentValue = false;
            }
        }
    }
</script>
