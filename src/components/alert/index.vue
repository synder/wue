<template>
    <div class="vux-alert">
        <wue-dialog
                v-model="showValue"
                @on-hide="$emit('on-hide')"
                @on-show="$emit('on-show')">
            <div class="weui-dialog__hd">
                <strong class="weui-dialog__title">{{title}}</strong>
            </div>
            <div class="weui-dialog__bd">
                <slot>
                    <div v-html="content"></div>
                </slot>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript:;"
                   class="weui-dialog__btn weui-dialog__btn_primary"
                   @click="click"
                   v-text="button"></a>
            </div>
        </wue-dialog>
    </div>
</template>

<script>
    
    import Dialog from '../dialog/index.vue'

    export default {
        name: 'wue-alert',
        components: {
            'wue-dialog': Dialog
        },
        props: {
            value: Boolean,
            title: String,
            content: String,
            button: {
                type: String,
                default: '确认'
            },
        },
        data () {
            return {
                showValue: false
            }
        },
        
        created () {
            if (typeof this.value !== 'undefined') {
                this.showValue = this.value;
            }
        },
        
        methods: {
            hidden: function () {
                this.showValue = false;
            },
            
            click: function () {
                this.$emit('on-click', this);
            }
        },
        
        watch: {
            value (val) {
                this.showValue = val;
            },
            
            showValue (val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style lang="less">
    @import '../../styles/transition.less';
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-tips/weui-dialog.less';
</style>
