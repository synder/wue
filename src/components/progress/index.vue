<template>
    <wue-circle v-model="value" :diameter="diameter"
                :trail-color="trailColor"
                :fill-color="fillColor"
                :speed="speed"
                :line-width="lineWidth"
                :stroke-color="strokeColor"
                v-if="type === 'circle'">
        <slot></slot>
    </wue-circle>
    
    <div class="weui-progress" v-else>
        <div class="weui-progress__bar" :style="style">
            <div class="weui-progress__inner-bar js_progress" :style="{width: value + '%', backgroundColor: strokeColor}"></div>
        </div>
        <span v-if="clear" class="weui-progress__opr">
            <i class="weui-icon-cancel" @click="onCancelClick"></i>
        </span>
    </div>
</template>

<script>
    
    import circle from '../circle/index.vue';
    
    export default {
        name: 'wue-progress',
        
        components: {
            'wue-circle': circle
        },
        
        data(){
            return {
                progress: this.value,
            };
        },

        props: {
            value: Number,
            type: {
                type:String,
                default: 'line'
            },
            clear: {
                type: Boolean,
                default: false
            },
            diameter: {
                type: Number,
                default: 100
            },
            lineWidth: {
                type: Number,
                default: 3
            },
            strokeColor: {
                type: String,
                default: '#1AAD19'
            },
            trailColor: {
                type: String,
                default: '#D9D9D9'
            },
            fillColor: {
                type: String,
                default: 'none'
            },
            speed: {
                type: Number,
                default: 500
            },
        },

        computed: {
            style () {
                return {
                    height: this.lineWidth + 'px',
                    backgroundColor: this.trailColor
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
        },

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
    @import "../../styles/base/reset.less";
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
    @import '../../styles/widget/weui-progress/weui-progress.less';
</style>
