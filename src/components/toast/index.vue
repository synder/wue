<template>
    <div v-show="currentValue">
        <div class="weui-toast" :class="{ 'weui-toast_text': !icon }" :style="style">
            <i class="weui-icon_toast" :class="classes" v-if="icon"></i>
            <p class="weui-toast__content" v-text="message" :style="text"></p>
        </div>
    </div>
</template>

<script>

    export default {
        components: {
      
        },

        props: {
            value: {
                type: Boolean,
                default: true
            },
            icon: {
                type: String,
            },
            message: {
                type: String,
                default: ''
            },
            
            height: {
                type: Number
            }
        },
        
        data(){
            return {
                currentValue : this.value,
            };
        },
        
        methods: {
            show(){
                this.currentValue = true;
            },
            
            hide(){
                this.currentValue = false;
            }
        },
        
        watch: {
            value (val) {
                this.currentValue = val;
            },

            currentValue (val) {
                if(!val){
                    this.$emit('hidden');
                }
                this.$emit('input', val);
            }
        },

        computed: {
            classes(){
                if(this.icon){
                    return [icon];
                }else{
                    return [];
                }
            },
            
            style () {
                
                if(!this.icon){
                    return {
                        minHeight: '0.1rem',
                        lineHeight: '1rem',
                        top: '80%',
                    }
                }
                
                return {};
            },

            text(){
                if(!this.icon){
                    return {
                        margin: '0.3rem',
                        fontSize: '0.8rem'
                    }
                }
                return {};
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-tips/weui-toast.less';
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
</style>
