<template>
    <div :style="style">
        <slot></slot>
    </div>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset";
</style>

<script>
    export default {
        name: 'wue-group',

        props: {
            value: String | Number,
            height: Number,
            width: Number
        },

        data(){
            return {
                activeID: this.value,
                count: 0,
            };
        },
        
        computed: {
            style(){
                return {
                    height: this.height + 'px',
                    width: this.width + 'px'
                };
            }
        },
        
        watch: {
            value(val){
                this.activeID = val;
            },

            activeID(val){
               this.$emit('input', val);
            }
        }
    }
</script>