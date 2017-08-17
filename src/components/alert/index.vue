<template>
    <div class="wue-alert">
        <wue-dialog
                v-model="showValue"
                @hide="$emit('hide')"
                @show="$emit('show')">
            <div class="dialog__hd">
                <strong class="dialog__title" v-html="showTitle"></strong>
            </div>
            <div class="dialog__bd">
                <slot>
                    <div v-html="showContent"></div>
                </slot>
            </div>
            <div class="dialog__ft">
                <a class="dialog__btn dialog__btn_primary"
                   @click.prevent.stop="click"
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
            title: String | Number,
            content: String | Number,
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
    @import '../../styles/widget/tips/mask.less';
    @import '../../styles/widget/tips/dialog.less';
</style>
