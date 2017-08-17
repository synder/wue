<template>
    <wue-dialog
            v-model="currentValue"
            :dialogClass="theme === 'android' ? 'dialog skin_android' : 'dialog'"
            :hide-on-blur="hideOnBlur"
            @on-hide="$emit('on-hide')"
            @on-show="$emit('on-show')">
        
        <div class="dialog__hd" v-if="!!title">
            <strong class="dialog__title" v-html="title"></strong>
        </div>
        <div class="dialog__bd">
            <slot><div v-html="content"></div></slot>
        </div>
        <div class="dialog__ft">
            <slot name="footer">
                <a class="dialog__btn dialog__btn_default" @click.prevent.stop="onCancel">{{confirm || '取消'}}</a>
                <a class="dialog__btn dialog__btn_primary" @click.prevent.stop="onConfirm">{{cancel || '确认'}}</a>
            </slot>
        </div>
    </wue-dialog>
</template>

<script>
    import Dialog from '../dialog/index.vue';
    
    export default {
        name: 'wue-confirm',
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
            title: String | Number,
            confirm: String | Number,
            cancel: String | Number,
            content: String | Number,
        },
        data () {
            return {
                msg: '',
                currentValue: this.value
            }
        },
        watch: {
            value (val) {
                this.currentValue = val;
            },
            currentValue (val) {
                this.$emit('input', val);
            },
        },
        methods: {
            hide: function () {
                this.currentValue = false;  
            },

            show(title, content){
                this.title = title;
                this.content = content;
                this.currentValue = true;
            },
            
            onConfirm () {
                this.hide();
                this.$emit('confirm', this);
            },
            onCancel () {
                this.hide();
                this.$emit('cancel', this);
            }
        }
    }
</script>

<style lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/vue/transition.less';
    @import '../../styles/widget/tips/mask.less';
    @import '../../styles/widget/tips/dialog.less';
</style>
