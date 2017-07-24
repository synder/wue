<!--颜色选择器-->
<template>
    <wue-picker v-show="visible" title="选择颜色">
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
    import Flex from '../flex/index.vue';
    import FlexItem from '../flex/item.vue';
    import Picker from './index.vue';

    export default {
        name: 'color-picker',
        components: {
            'wue-flex': Flex,
            'wue-picker': Picker,
            'wue-flex-item': FlexItem,
        },
        created () {
            this.currentValue = this.value;
        },
        props: {
            visible: Boolean,
            colors: {
                type: Array,
                default: function () {
                    return [
                        '#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#FFFFFF',
                        '#09BB07', '#3366FF', '#FFBE00', '#F76260', '#10AEFF', '#009999',
                    ]
                }
            },
            value: String
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
        data () {
            return {
                currentValue: '',
                size: 'large',
                width: 40
            }
        },
        watch: {
            value (val) {
                this.currentValue = val;
            },
            
            currentValue (color) {
                this.$emit('on-change', color);
                this.$emit('input', color);
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
            }
        }
    }
</script>

<style lang="less">

    @import '../../styles/base/reset.less';
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
    
    .weui-picker__bd{
        display: block !important;
        width: 100% !important;
    }

    .wue-color-box {
        text-align: center;
    }

    .wue-color-picker {
        font-size: 0;
        width: 100%;
        padding: 0.5rem 0.1rem;
    }

    .wue-color-item {
        display: inline-block;
        text-align: center;
        box-sizing: border-box;
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
