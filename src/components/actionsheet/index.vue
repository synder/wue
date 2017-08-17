<template>
    <div>
        <div class="mask_transparent actionsheet__mask actionsheet__mask_show"
             v-show="currentValue && type === 'ios'" 
             @click="currentValue = false"></div>
        
        <div class="actionsheet actionsheet_toggle" v-if="type === 'ios'" v-show="currentValue">
            <div class="actionsheet__title" v-if="title">
                <p class="actionsheet__title-text" v-html="title"></p>
            </div>
            <div class="actionsheet__menu">
                <div class="actionsheet__cell" v-for="item in options" 
                     :key="item.id" 
                     @click="itemClick(item)"
                     v-text="item.text"></div>
            </div>
            <div class="actionsheet__action" v-if="cancel">
                <div class="actionsheet__cell" @click="currentValue = false" v-html="cancel"></div>
            </div>
        </div>

        <div class="skin_android" v-if="type === 'android'" v-show="currentValue">
            <div class="mask" @click="currentValue = false"></div>
            <div class="actionsheet">
                <div class="actionsheet__menu">
                    <div v-for="item in options" :key="item.id" class="actionsheet__cell" @click="itemClick(item)"
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
    @import '../../styles/widget/tips/mask.less';
    @import '../../styles/widget/tips/actionsheet.less';

    .actionsheet__mask_show {
        display: block;
        .transform-origin(0 0);
        .opacity(1);
        .scale(1, 1);
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>
