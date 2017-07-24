<template>
    <i :class="'wue-icon-' + name" :style="style" @click="click"></i>
</template>

<script>
    export default {
        name: 'wue-icon',

        props: {
            name: {
                type: String,
                required: true
            },
            size: {
                type: Number | String,
                default: 23
            },
            
            color: String
        },

        computed: {
            style: function () {
                let result = {};
                
               if(this.size){
                   if(this.size === 'mini'){
                       result.fontSize =23 + 'px';
                   }else if(this.size === 'middle'){
                       result.fontSize = 50 + 'px';
                   }else if(this.size === 'large'){
                       result.fontSize = 93 + 'px';
                   }else{
                       result.fontSize = (parseInt(this.size) || 23) + 'px';
                   }
               }
               
               if(this.color){
                   result.color = this.color;
               }
                
                return result;
            }
        },
        
        methods: {
            click(){
                this.$emit('click');
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/icon/wue-icon.less';
</style>
