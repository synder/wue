<template>
    <transition name="wue-mask">
        <div class="loading_toast wue-loading" v-show="currentValue">
            <div class="mask_transparent"></div>
            <div class="toast">
                <i class="loading icon_toast"></i>
                <p class="toast__content" v-html="showText || '加载中'"></p>
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
                    this.$emit('hidden', this);
                }
                this.$emit('input', val)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/vue/transition.less';
    @import '../../styles/widget/tips/mask.less';
    @import '../../styles/widget/tips/toast.less';
    @import '../../styles/widget/loading/loading.less';

    .wue-loading .toast {
        z-index: 5001;
    }

    .icon_toast.loading {
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
