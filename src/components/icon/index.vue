<template>
    <i :class="name" :style="style" @click="$emit('click')"></i>
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
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    @import "../../styles/icon/icon.less";
</style>
