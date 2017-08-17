<template>
    <transition name="wue-mask">
        <div v-show="currentValue">
            <div class="toast" :class="{ 'toast_text': !icon }" :style="style">
                <i class="icon_toast" :class="classes" v-if="icon"></i>
                <p class="toast__content" v-text="message" :style="text"></p>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        components: {
      
        },

        props: {
            value: {
                type: Boolean,
                default: false
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
                    this.$emit('hidden', this);
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
    @import '../../styles/vue/transition.less';
    @import '../../styles/widget/tips/toast.less';
    @import '../../styles/icon/icon.less';
</style>
