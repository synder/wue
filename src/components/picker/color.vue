
<template>
    <wue-picker v-if="visibleValue" title="选择颜色" @cancel="hide" @confirm="hide">
        <div v-for="colors in rowsColors" style="display: block;width: 100%;">
            <wue-flex class="wue-color-picker" >
                <wue-flex-item  :key="color" class="wue-color-box" v-for="color in colors">
                    <span class="wue-color-item"
                          :style="style(color)"
                          @click="change(color)"
                          :class="{'wue-color-white': color.toUpperCase().indexOf('#FFF') > -1}">
                        
                        <i v-if="color === value" class="wue-color-checked weui-icon-success-no-circle" :style="{lineHeight: width + 'px'}"></i>
                    </span>
                </wue-flex-item>
            </wue-flex>
        </div>
    </wue-picker>
</template>

<script>
    import WueFlex from '../flex/index.vue';
    import WueFlexItem from '../flex/item.vue';
    import WuePicker from './index.vue';

    export default {
        name: 'wue-color-picker',
        components: {
            WueFlex,
            WuePicker,
            WueFlexItem
        },
        data () {
            return {
                currentValue: '',
                size: 'large',
                width: 40,
                visibleValue: !!this.value
            }
        },
        props: {
            value: Boolean,
            colors: {
                type: Array,
                default: function () {
                    return [
                        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#AAAAAA',
                        '#CC68F8', '#09BB07', '#3366FF', '#F76260', '#10AEFF', '#009999',
                    ]
                }
            },
        },
        computed: {
            rowsColors(){
                let result = [];
                
                let temp = [];
                
                for(let i = 0; i < this.colors.length; i++){
                    temp.push(this.colors[i]);
                    
                    if(temp.length === 6){
                        result.push(temp);
                        temp = [];
                    }
                }
                
                if(temp.length !== 0){
                    result.push(temp);
                }
                
                return result;
            }
        },
        watch: {
            value (visible) {
                this.visibleValue = !!visible;
            },

            visibleValue(visible){
                this.$emit('input', visible);
            },
            
            currentValue (color) {
                this.$emit('selected', color);
            }
        },
        methods: {
            change (color) {
                this.currentValue = color;
            },

            style(color){
                return {
                    borderRadius: this.width / 2 + 'px',
                    backgroundColor: color,
                    width: this.width + 'px',
                    height: this.width + 'px'
                };
            },

            hide(){
                this.visibleValue = false;
            }
        }
    }
</script>

<style lang="less">

    @import '../../styles/base/reset.less';
    @import '../../styles/icon/weui-icon.less';
    
    .wue-color-box {
        text-align: center;
    }

    .wue-color-picker {
        font-size: 0;
        width: 100%;
        margin-top: 0.5rem !important;
    }

    .wue-color-item {
        display: inline-block;
        text-align: center;
        .box-sizing(border-box);
        position: relative
    }

    .wue-color-checked .weui-icon-success-no-circle:before {
        color: #fff;
    }

    .wue-color-checked {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .wue-color-white {
        border: 1px solid #ccc;
    }

    .wue-color-white .wue-color-checked:before {
        color: #ccc;
    }

</style>
