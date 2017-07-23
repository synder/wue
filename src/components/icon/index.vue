<template>
    <i :class="'weui-icon-' + name" :style="style"></i>
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
                
                return result;
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/wue-icon.less';
    @import '../../styles/icon/weui-icon_font.less';
</style>
