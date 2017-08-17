<template>
    <div v-show="show">
        <div class="mask animate-fade-in" @click="onCancel"></div>
        <div class="picker animate-slide-up">
            <div class="picker__hd">
                <a class="picker__action" @click="onCancel" v-text="cancel"></a>
                <span v-text="title"></span>
                <a class="picker__action" @click="onConfirm" v-text="confirm"></a>
            </div>
            <div class="picker__bd" :style="{height: height}">
                <slot>
                    <wue-picker-options @selected="onOptionsValueSelected" v-if="options" v-for="(items, key) in options" :id="key" :items="items"></wue-picker-options>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import '../../styles/base/reset.less';
    @import '../../styles/vue/transition.less';
    @import '../../styles/widget/tips/mask.less';
    @import '../../styles/widget/animate/animate.less';
    @import '../../styles/widget/picker/picker.less';
</style>

<script>
    
    import WuePickerOptions from "./options.vue";
    
    export default{
        name: 'wue-picker',

        components: {
            WuePickerOptions
        },
        
        props: {
            value: Boolean, //显示与否
            title: String, 
            init: Object,
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
            },
            height: String
        },
        
        data(){
            return {
                show: !!this.visible,
                currentValue: this.init || {}
            }
        },

        watch: {
            value(val) {
                this.show = val;
            },
            
            show(val){
                this.$emit('input', val);
            },
        },
        
        methods: {
            
            hidden(){
                this.show = false;
            },
            
            onCancel(){
                this.hidden();
                this.$emit('cancel', this);
              
            },

            onConfirm(){
                this.hidden();
                this.$emit('confirm', this);
            },

            onOptionsValueSelected(id, value){
                
                if(!this.currentValue){
                    this.currentValue = {};
                }

                this.$set(this.currentValue, id, value);

                this.$emit('selected', this.currentValue);
            }
        },

       
    }
</script>