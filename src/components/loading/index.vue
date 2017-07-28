<template>
    <transition name="wue-mask">
        <div class="weui-loading_toast wue-loading" v-show="currentValue">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content" v-html="showText || '加载中'"></p>
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
            text: String | Number,
        },
        data () {
            return {
                currentValue: this.value,
                showText: this.text,
            }
        },
        methods: {
            show(text){
                this.showText = text;
                this.currentValue = true;
            },
            
            hide(){
                this.currentValue = false;
            }
        },
        watch: {
            value (val) {
                this.currentValue = val
            },
            currentValue (val) {
                if(val === false){
                    this.$emit('hidden', val)
                }
                this.$emit('input', val)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/vue/transition.less';
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
