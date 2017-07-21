<template>
    <div class="weui-flex__item" :class="classes" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-flex-item',

        props: {
            flex: {
                type: [Number, String],
                default: 1
            },
            classes: String
        },

        computed: {
            gutter () {
                return this.$parent.gutter;
            },

            style () {
                let ret = {};

                if (this.gutter) {
                    ret.paddingLeft = this.gutter / 2 + 'px';
                    ret.paddingRight = ret.paddingLeft
                }

                ret.flex = this.flex;

                return ret
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/widget/weui-flex/weui-flex.less';
</style>
