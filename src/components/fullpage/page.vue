<template>
    <div class="wue-fullpage-page" :style="style">
        <slot></slot>
    </div>
</template>

<style lang='less' scoped>
    .wue-fullpage-page{
        overflow: hidden;
        border: none;
        margin: 0;
        padding: 0;
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
                show: false
            };
        },

        computed: {
            style(){
                return {
                    background: this.bg,
                    height: this.$parent.height + 'px',
                    width: this.$parent.width + 'px'
                }
            }
        },

        methods: {},

        watch: {},

        mounted(){

        }
    }
</script>