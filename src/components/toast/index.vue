<template>
    <div v-if="visible">
        <div class="weui-toast" :class="{ 'weui-toast_text': type === 'text' }" :style="style" ref="toast">
            <i class="weui-icon_toast" :class="icon" v-if="type !== 'text'"></i>
            <p class="weui-toast__content" v-text="message"></p>
        </div>
    </div>
</template>

<script>

    export default {
        components: {
      
        },

        props: {
            visible: {
                default: true
            },
            icon: {
                type: String,
                default: 'weui-icon-success-no-circle'
            },
            type: {
                type: String,
                default: 'success'
            },
            message: {
                type: String,
                default: ''
            }
        },

        computed: {
            style () {
                if (this.type === 'text') {
                    const messageLength = this.message.length + 2;

                    return {
                        width: messageLength + 'em',
                        marginLeft: '-' + (messageLength / 2) + 'em'
                    }
                }

                return {}
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-tips/weui-toast.less';
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
</style>
