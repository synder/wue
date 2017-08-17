<template>
    <div class="wue-group-item" style="display: none;" v-show="active">
        <slot></slot>
    </div>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset";
    @import '../../styles/vue/transition.less';
    
    .wue-group-item{
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>

<script>
    export default {
        name: 'wue-group-item',

        props: {
            id: String | Number
        },

        data(){
            return {
                uuid: this.id || this.$parent.count++
            };
        },

        computed: {
            active(){
                return this.$parent.activeID == this.uuid;
            },

            style(){
                return {
                    height: this.$parent.height + 'px',
                    width: this.$parent.width + 'px'
                };
            }
        },

        methods: {},

        watch: {},

        mounted(){

        }
    }
</script>