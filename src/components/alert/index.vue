<template>
    <div class="wue-alert">
        <wue-dialog
                v-model="showValue"
                @hide="$emit('hide')"
                @show="$emit('show')">
            <div class="weui-dialog__hd">
                <strong class="weui-dialog__title" v-html="showTitle"></strong>
            </div>
            <div class="weui-dialog__bd">
                <slot>
                    <div v-html="showContent"></div>
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
            value: {
                type: Boolean,
                default: false
            },
            title: String,
            content: String,
            button: {
                type: String,
                default: '确认'
            },
        },
        data () {
            return {
                showValue: false,
                showTitle: this.title,
                showContent: this.content
            }
        },
        
        created () {
            if (typeof this.value !== 'undefined') {
                this.showValue = this.value;
            }
        },
        
        methods: {
            show: function (title, content) {
                this.showTitle = title;
                this.showContent = content;
                this.showValue = true;
            },
            
            hide: function () {
                this.showValue = false;
            },
            
            click: function () {
                this.hide();
                this.$emit('click', this);
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
    @import "../../styles/base/reset.less";
    @import '../../styles/vue/transition.less';
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-tips/weui-dialog.less';
</style>
