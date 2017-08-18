<template>
    <a class="btn" 
            :href="to"
            :style="style"
            :class="classes" 
            :disabled="disabled" 
            :type="action" 
            @click="onClick">
        <i class="loading" v-if="loading"></i>
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
            height: String,
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
                        'btn_disabled': this.disabled,
                        'btn_mini': this.mini
                    },
                    `btn_${this.type}`,
                    this.plain ? `btn_plain-${this.type}` : '',
                    this.loading ? `btn_loading` : ''
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
    @import '../../styles/widget/button/btn_global.less';
    @import '../../styles/widget/button/button.less';
    @import '../../styles/widget/loading/loading.less';
</style>
