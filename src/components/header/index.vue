<template>
    <header class="wue-header" :class="{ 'is-fixed': fixed }" @click.stop="$emit('headerClick')"
            :style="style">
        <div class="wue-header-btn left" @click="leftBtnClick">
            <slot name="left">
                <i class="wue-icon-arrow-left-l"></i>
            </slot>
        </div>
        <div class="wue-header-title">
            <slot>
                <span v-text="title"></span>
            </slot>
        </div>
        <div class="wue-header-btn right">
            <slot name="right">
                <i class="wue-icon-more-dot"></i>
            </slot>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'wue-header',

        props: {
            title: String | Number,
            fixed: {
                type: Boolean,
                default: true
            },
            background: {
                type: String,
                default: '#1AAD19'
            },
            color: {
                type: String,
                default: '#FFF'
            }
        },
        
        computed: {
            style(){
                return { 
                    backgroundColor: this.background,
                    color: this.color
                };
            }
        },
        
        methods: {
            leftBtnClick(){
                window.history.go(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/icon/wue-icon.less';
    
    @headerHeight: 40px;

    .wue-header {
        .display-flex();
        .flex-align-items(center);
        .box-sizing(border-box);
        width: 100%;
        height: @headerHeight;
        padding: 0 10px;
        margin: 0;
        color: white;
        position: relative;
        white-space: nowrap;
        z-index: 1000;

        .left, .right {
            display: block;
            overflow: hidden;
            float: left;
            height: @headerHeight;
            line-height: @headerHeight + 2;
            font-size: @headerHeight - 20;
        }

        .wue-header-title {
            font-size: @headerHeight - 22;
            line-height: @headerHeight;
            font-weight: 100;
            text-align: center;
            .flex(1);
        }
    }

    .is-fixed {
        position: fixed;
        left: 0;
        top: 0;
    }
</style>
