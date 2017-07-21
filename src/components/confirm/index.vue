<template>
    <wue-dialog
            v-model="show"
            :dialogClass="theme === 'android' ? 'weui-dialog weui-skin_android' : 'weui-dialog'"
            :hide-on-blur="hideOnBlur"
            @on-hide="$emit('on-hide')"
            @on-show="$emit('on-show')">
        
        <div class="weui-dialog__hd" v-if="!!title">
            <strong class="weui-dialog__title">{{title}}</strong>
        </div>
        <div class="weui-dialog__bd">
            <slot><div v-html="content"></div></slot>
        </div>
        <div class="weui-dialog__ft">
            <slot name="footer">
                <a class="weui-dialog__btn weui-dialog__btn_default" @click.prevent.stop="onCancel">{{confirm || '取消'}}</a>
                <a class="weui-dialog__btn weui-dialog__btn_primary" @click.prevent.stop="onConfirm">{{cancel || '确认'}}</a>
            </slot>
        </div>
    </wue-dialog>
</template>

<script>
    import Dialog from '../dialog/index.vue';
    
    export default {
        name: 'confirm',
        components: {
            'wue-dialog': Dialog
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: 'ios'
            },
            hideOnBlur: {
                type: Boolean,
                default: false
            },
            title: String,
            confirm: String,
            cancel: String,
            content: String,
        },
        created () {
            if (this.value) {
                this.show = this.value;
            }
        },
        watch: {
            value (val) {
                this.show = val;
            },
            show (val) {
                this.$emit('input', val);
            }
        },
        data () {
            return {
                msg: '',
                show: false
            }
        },
        methods: {
            hidden: function () {
                this.show = false;  
            },
            
            onConfirm () {
                this.$emit('on-confirm', this);
            },
            onCancel () {
                this.show = false;
                this.$emit('on-cancel');
            }
        }
    }
</script>

<style lang="less">
    @import '../../styles/transition.less';
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-tips/weui-dialog.less';
</style>
