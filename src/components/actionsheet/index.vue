<template>
    <div>
        <div class="weui-mask_transparent actionsheet__mask actionsheet__mask_show"
             v-show="currentValue && type === 'ios'" 
             @click="currentValue = false"></div>
        
        <div class="weui-actionsheet weui-actionsheet_toggle" v-if="type === 'ios'" v-show="currentValue">
            <div class="weui-actionsheet__title" v-if="title">
                <p class="weui-actionsheet__title-text" v-html="title"></p>
            </div>
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" v-for="item in options" 
                     :key="item.id" 
                     @click="itemClick(item)"
                     v-text="item.text"></div>
            </div>
            <div class="weui-actionsheet__action" v-if="cancel">
                <div class="weui-actionsheet__cell" @click="currentValue = false" v-html="cancel"></div>
            </div>
        </div>

        <div class="weui-skin_android" v-if="type === 'android'" v-show="currentValue">
            <div class="weui-mask" @click="currentValue = false"></div>
            <div class="weui-actionsheet">
                <div class="weui-actionsheet__menu">
                    <div v-for="item in options" :key="item.id" class="weui-actionsheet__cell" @click="itemClick(item)"
                         v-text="item.text"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-actionsheet',

        props: {
            value: Boolean,
            type: {
                type: String,
                default: 'ios'
            },
            title: String | Number,
            options: {
                type: Array,
                default: []
            },
            cancel: {
                type: String | Number,
            },
        },

        data () {
            return {
                currentValue: this.value
            }
        },

        watch: {
            currentValue (val) {
                this.$emit('input', val);
            },

            value (val) {
                this.currentValue = val;
            }
        },

        methods: {
            itemClick (item) {
                this.currentValue = false;
                this.$emit('click', item);
            }
        },

        mounted () {
            this.currentValue = !!this.value;
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-tips/weui-actionsheet.less';

    .actionsheet__mask_show {
        display: block;
        .transform-origin(0 0);
        .opacity(1);
        .scale(1, 1);
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>
