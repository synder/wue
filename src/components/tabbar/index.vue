<template>
    <div class="tabbar" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-tabbar',

        props: {
            value: String | Number,
            fixed: {
                type: Boolean,
                default: true
            }
        },
        
        data(){
            return {
                activeID: this.value,
                count: 0
            };  
        },
        
        watch: {
            value(val){
                this.activeID = val;
            },

            activeID(val){
                this.$emit('input', val);
            }
        },
        
        computed: {
            style(){
                return { position: this.fixed ? 'fixed' : 'absolute' };
            }
        },

        activated(){
            console.log('ok');
        }
        
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/tab/tabbar.less';
</style>
