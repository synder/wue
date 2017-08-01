<template>
    <div class="wue-fullpage-page" :style="style">
        <slot></slot>
    </div>
</template>

<style lang='less' scoped>
    
    @import "../../styles/base/reset";
    
    .wue-fullpage-page{
        margin: 0;
        padding: 0;
        .flex(1);
        .box-sizing(border-box);
    }
</style>

<script>
    export default {
        name: 'wue-fullpage-page',

        props: {
            id: {
                type: String
            },
            
            bg: {
                type: String
            }
        },

        data(){
            return {
                uuid: null,
                show: false,
                width: null,
                height: null
            };
        },

        computed: {
            style(){
                return {
                    background: this.bg,
                    height: this.height + 'px',
                    width: this.width + 'px'
                }
            }
        },

        methods: {},

        watch: {},

        mounted(){

        }
    }
</script>