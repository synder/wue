<template>
    <a class="weui-btn" 
            :style="style"
            :class="classes" 
            :disabled="disabled" 
            :type="action" 
            @click="onClick">
        <i class="weui-loading" v-if="loading"></i>
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: 'wue-button',
        props: {
            type: {
                default: 'default'
            },
            disabled: Boolean,
            mini: Boolean,
            plain: Boolean,
            action: String,
            loading: Boolean,
            to: String,
            background: String,
            color: String,
            radius: Number,
            width: String,
            height: String
        },
        methods: {
            onClick () {
                if(this.to){
                    window.location.hash = this.to;
                }
                
                this.$emit('click', this);
            }
        },
        computed: {
            classes () {
                return [
                    {
                        'weui-btn_disabled': this.disabled,
                        'weui-btn_mini': this.mini
                    },
                    `weui-btn_${this.type}`,
                    this.plain ? `weui-btn_plain-${this.type}` : '',
                    this.loading ? `weui-btn_loading` : ''
                ]
            },
            
            style(){
                let temp = {};
                
                if(this.background){
                    if(this.plain){
                        temp.borderColor = this.background;
                    }else{
                        temp.backgroundColor = this.background;
                    }
                }
                
                if(this.width){
                    temp.width = this.width;
                }

                if(this.height){
                    temp.height = this.height;
                }
                
                if(this.color){
                    temp.color = this.color;
                }
                
                if(this.radius != null){
                    temp.borderRadius = this.radius + 'px';
                }
                
                return temp;
            }
        }
    }
</script>

<style lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/weui-button/weui-btn_global.less';
    @import '../../styles/widget/weui-button/weui-button.less';
    @import '../../styles/widget/weui-loading/weui-loading.less';
</style>
