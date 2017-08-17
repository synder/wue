<template>

    <router-link class="weui-cell weui-cell_access" :class="{'weui-cell_access': !!to}" :to="to" v-if="to">
        <div class="weui-cell_hd" >
            <slot name="icon">
                <img v-if="icon" :src="icon"  alt="" class="cell-icon" :style="iconStyle">
            </slot>
        </div>
        <div class="weui-cell__bd">
            <slot>
                <p v-html="title"></p>
            </slot>
        </div>
        <div class="weui-cell__ft">
            <slot name="label">{{label}}</slot>
        </div>
    </router-link>
    
    <div class="weui-cell" :class="{'weui-cell_access': !!to}"  @click="handleClick" v-else>
        <div class="weui-cell_hd">
            <slot name="icon">
                <img v-if="icon" :src="icon"  alt="" class="cell-icon" :style="iconStyle">
            </slot>
        </div>
        <div class="weui-cell__bd">
            <slot>
                <span v-html="title"></span>
            </slot>
        </div>
        <div class="weui-cell__ft">
            <slot name="label">{{label}}</slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-cell',

        props: {
            title: {
                type: String | Number
            },
            label: {
                type: String | Number
            },
            icon: String,
            iconStyle: String,
            to: String,
        },

        computed: {
            
        },

        mounted () {
            this.$on('click-in-cell-swipe', this.handleSwipeClick);
        },

        methods: {
            handleSwipeClick (event) {
                this.$emit('swipe-click', event);
            },
            
            handleClick(event){
                this.$emit('click', event);
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-cell/weui-cell-global.less';
    
    .cell-icon{
        width: 25px;
        margin-right:5px;
        display:block;
    }

    .weui-cell_access {
        .setTapColor();
        color: inherit;
        &:active {
            background-color: #ECECEC;
        }
        .weui-cell__ft {
            padding-right: 13px;
            position: relative;
            &:after {
                content: " ";
                .setArrow(right, 6px, #C8C8CD, 2px);
                position: absolute;
                top: 50%;
                margin-top: -4px;
                right: 2px;
            }
        }
    }
    
</style>
