<template>
    <span class="badge" :class="classes" :style="style">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        name: 'wue-badge',
        props: {
            background:{
                type: String,
                default: '#F43530',
            },
            
            color: {
                type: String,
                default: '#FFF'
            },

            radius: {
                type: Number | String,
                default: '50%'
            },
        },
        
        data(){
            return {
                dot: false
            };
        },
        
        computed: {
            classes(){
                return {'badge_dot': this.dot};
            },
            
            style(){
                return { 
                    backgroundColor: this.background,
                    color: this.color,
                    borderRadius: this.radius.toString().indexOf('%') > 0 ? this.radius : this.radius + 'px',
                };
            }
        },
        
        mounted(){
            this.dot = !this.$slots.default;
        }
    }
</script>

<style lang="less">
    @import '../../styles/base/reset.less';
    @import "../../styles/widget/tips/badge.less";
</style>
