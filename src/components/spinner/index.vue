<template>
    <i class="loading" :style="style"></i>
</template>

<script>
    export default {
        name: 'wue-spinner',

        props: {
            size: {
                type: Number,
                default: 28
            },
            color: {
                type: String,
                default: '#ccc'
            }
        },
        
        computed: {
            style(){
                return { 
                    fontSize: this.size + 'px', 
                    color: this.color 
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/loading/loading.less';
</style>
