<template>
    <div class="wue-navbar" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-navbar',

        props: {
            value: String | Number,
            fixed: Boolean,
            color: {
                type: String,
                default: '#333'
            },
            backgroundColor: {
                type: String,
                default: '#FAFAFA'
            },
            activeColor: {
                type: String,
                default: '#09BB07'
            },
            disabledColor: {
                type: String,
                default: '#cfcfcf'
            },
            height: {
                type:Number  
            },
            lineWidth: {
                type: Number,
                default: 3
            },
           
        },
        
        data(){
            return {
                currentValue: this.value
            };
        },

        computed: {
            style () {
                return {
                    position: this.fixed ? 'fixed' : 'absolute',
                    backgroundColor: this.backgroundColor
                }
            }
        },

        watch: {
            currentValue (newValue) {
                this.$emit('input', newValue);
            },
            
            value(newValue){
                this.currentValue = newValue;
            }
        }
    }
</script>

<style scoped lang="less">

    @import "../../styles/base/reset.less";
    
    .wue-navbar {
        .flex-box();
        width: 100%;
        z-index: 5000;
        background-color: #fff;
    }
</style>
