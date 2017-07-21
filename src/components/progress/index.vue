<template>
    <div class="weui-progress">
        <div class="weui-progress__bar" :style="style">
            <div class="weui-progress__inner-bar js_progress" :style="{width: value + '%'}"></div>
        </div>
        <span v-if="clear" class="weui-progress__opr">
        <i class="weui-icon-cancel" @click="onCancelClick"></i>
    </span>
    </div>
</template>

<script>
    export default {
        name: 'wue-progress',
        
        data(){
            return {
                progress: this.value,
            };
        },

        props: {
            value: Number,
            height: Number,
            clear: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            style () {
                return {
                    height: this.height + 'px'
                }
            }
        },

        watch: {
            progress (val) {
                this.$emit('input', val);
            },

            value (val) {
                this.progress = val;
            }
        }

        methods: {
            onCancelClick (event) {
                event.preventDefault();
                this.progress = 0;
                this.$emit('on-cancel', this);
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
    @import '../../styles/widget/weui-progress/weui-progress.less';
</style>
