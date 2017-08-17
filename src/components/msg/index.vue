<template>
    <div class="msg">
        <div class="msg__icon-area">
            <slot name="icon">
                <wue-icon :name="icon || 'success'" size="80" color="#09bb07"></wue-icon>
            </slot>
        </div>
        <div class="msg__text-area">
            <h2 class="msg__title" v-html="title"></h2>
            <p class="msg__desc">
                <slot></slot>
            </p>
        </div>
        <div class="msg__opr-area">
            <p class="btn-area">
                <slot name="buttons"></slot>
            </p>
        </div>
    </div>
</template>

<script>
    import WueIcon from "../icon/index";

    export default {
        components: {WueIcon},
        name: 'wue-msg',
        props: {
            icon: String,
            title: String
        },
    }
</script>

<style lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/icon/icon.less';
    @import '../../styles/widget/page/msg.less';
</style>