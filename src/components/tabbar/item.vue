<template>
    <a class="weui-tabbar__item" :class="{ 'weui-bar__item_on': active }" @click.prevent.stop="handleClick">
        <slot>
            <span class="icon-box" v-if="showIcon">
                <slot name="icon">
                     <img :src="iconSrc" alt="" class="weui-tabbar__icon">
                </slot>
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
            id: String | Number,
            label: String | Number,
            icon: String,
            onIcon: String,
            badge: Number | String,
            dot: Boolean,
        },
        
        data(){
            return {
               uuid: this.id || this.$parent.count++,
            };
        },

        computed: {
            active () {
                return this.uuid == this.$parent.activeID;
            },
            
            iconSrc(){
                return this.active ? (this.onIcon || this.icon) : this.icon;
            },
            

            showIcon(){
                return this.$slots.icon || this.icon;
            }
        },

        methods: {
            handleClick () {
                this.$emit('click', this);
                this.$parent.activeID = this.uuid;
            }
        }
    }
</script>

<style scoped lang="less">

    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-tab/weui-tabbar.less';
    
    .weui-bar__item_on{
        .icon-box{
            color: #09BB07;
        }
    }
    
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
