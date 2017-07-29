<template>
    <div class="weui-msg">
        <div class="weui-msg__icon-area">
            <i class="weui-icon_msg" :class="`weui-icon-${icon || 'success'}`"></i>
        </div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title" v-html="title"></h2>
            <p class="weui-msg__desc">
                <slot></slot>
            </p>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <slot name="buttons"></slot>
            </p>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'msg',
        props: ['icon', 'title'],
        methods: {
            
        }
    }
</script>

<style lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/icon/weui-icon.less';
    @import '../../styles/widget/weui-page/weui-msg.less';
</style>