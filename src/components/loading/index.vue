<template>
    <transition name="wue-mask">
        <div class="weui-loading_toast wue-loading" v-show="show">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{ text || '加载中' }}
                    <slot></slot>
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'wue-loading',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            text: String,
        },
        created () {
            this.show = this.value
        },
        data () {
            return {
                show: false
            }
        },
        watch: {
            value (val) {
                this.show = val
            },
            show (val) {
                this.$emit('input', val)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-tips/weui-toast.less';
    @import '../../styles/widget/weui-loading/weui-loading.less';

    .wue-loading .weui-toast {
        z-index: 5001;
    }

    .weui-icon_toast.weui-loading {
        margin: 30px 0 0;
        width: 38px;
        height: 38px;
        vertical-align: baseline;
        display: inline-block;
    }

    .wue-mask-enter, .wue-mask-leave-active {
        .opacity(0);
    }
  
    .wue-mask-leave-active, .wue-mask-enter-active {
        .transition(opacity 300ms);
    }
</style>
