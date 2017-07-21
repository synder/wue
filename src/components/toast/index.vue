<template>
    <div v-if="visible">
        <div class="weui-toast" :class="{ 'weui-toast_text': type === 'text' }" :style="style" ref="toast">
            <wue-icon :type="icon" class="weui-icon_toast" v-if="type !== 'text'"></wue-icon>
            <p class="weui-toast__content" v-text="message"></p>
        </div>
    </div>
</template>

<script>
    import Icon from '../icon/index';

    export default {
        components: {
            'wue-icon': Icon
        },

        props: {
            visible: {
                default: true
            },
            icon: {
                type: String,
                default: 'success-no-circle'
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
                    const messageLength = this.message.length + 2

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
</style>
