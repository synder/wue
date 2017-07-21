<template>
    <div v-show="show">
        <div class="weui-mask weui-animate-fade-in"></div>
        <div class="weui-picker weui-animate-slide-up">
            <div class="weui-picker__hd">
                <a class="weui-picker__action" @click="onCancel" v-text="cancel"></a>
                <span v-text="title"></span>
                <a class="weui-picker__action" @click="onConfirm" v-text="confirm"></a>
            </div>
            <div class="weui-picker__bd">
                <slot>
                    <wue-picker-options @change="onOptionsValueChanged" v-if="options" v-for="(items, key) in options" :id="key" :items="items"></wue-picker-options>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import '../../styles/variable.less';
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-animate/weui-animate.less';
    @import '../../styles/widget/weui-picker/weui-picker.less';
</style>

<script>
    
    import Options from "./options.vue";
    
    export default{
        name: 'wue-picker',
        
        props: {
            value: Object, //显示与否
            title: String, //显示与否
            visible: Boolean,
            confirm: {
                type: String,
                default: '确认'
            },
            cancel: {
                type: String,
                default: '取消'
            },
            options: {
                type: Object,
            }
        },
        
        data(){
            return {
                show: !!this.visible,
                currentValue: this.value || {}
            }
        },

        watch: {
            visible(val) {
                this.show = val;
            },

            value(val){
                if(val){
                    this.currentValue = val;
                }
            }
        },

        components: {
            'wue-picker-options': Options
        },
        
        methods: {
            
            hidden(){
                this.show = false;
            },
            
            onCancel(){
                this.$emit('cancel', this);
                this.hidden();
            },

            onConfirm(){
                this.$emit('confirm', this);
                this.$emit('change', this.currentValue);
                this.hidden();
                
            },

            onOptionsValueChanged(id, value){
                
                if(!this.currentValue){
                    this.currentValue = {};
                }
                
                this.currentValue[id] = value;
                
                this.$emit('change', this.currentValue);
            }
        },

       
    }
</script>