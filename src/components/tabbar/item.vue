<template>
    <a class="weui-tabbar__item" :class="{ 'weui-bar__item_on': active }" @click.prevent.stop="handleClick">
        <slot>
            <span class="icon-box" v-if="showIcon">
                <img :src="showIcon" alt="" class="weui-tabbar__icon">
                <wue-badge :dot="dot" v-text="badge" v-if="badge || dot"></wue-badge>
            </span>
            <p class="weui-tabbar__label" v-html="label"></p>
        </slot>
    </a>
</template>

<script>
    import Badge from '../badge/index.vue';
    
    export default {
        name: 'wue-tabbar-item',
        
        components: {
            'wue-badge': Badge,
        },

        props: {
            id: String,
            label: String,
            icon: String,
            onIcon: String,
            badge: Number | String,
            dot: Boolean
        },
        
        data(){
            return {
              
            };
        },

        created(){
            if(!this.id){
                this.id = Math.random().toString() + Date.now();
            }
        },

        computed: {
            active () {
                return this.id == this.$parent.value;
            },

            showIcon(){
                return this.active ? (this.onIcon || this.icon) : this.icon;
            }
        },

        methods: {
            handleClick () {
                this.$emit('click', this);
                this.$parent.$emit('input', this.id);
            }
        }
    }
</script>

<style scoped lang="less">

    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-tab/weui-tabbar.less';
    
    .icon-box{
        display: inline-block;
        position: relative;
    }
    
    .weui-badge{
        position: absolute;
        top: -2px;
        right: -13px;
    }
</style>
