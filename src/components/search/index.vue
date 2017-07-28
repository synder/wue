<template>
    
    <div>
        <div class="weui-search-bar" :class="{'weui-search-bar_focusing': activated}">
            <div class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="text" class="weui-search-bar__input" :placeholder="placeholder" v-model="currentValue" ref="input">
                    <a href="javascript:" class="weui-icon-clear" @click="searchClear"></a>
                </div>
                <label class="weui-search-bar__label" @click="textClick" v-show="!activated">
                    <i class="weui-icon-search"></i>
                    <span v-text="placeholder"></span>
                </label>
            </div>
            <a href="javascript:" class="weui-search-bar__cancel-btn" @click="searchCancel" v-show="activated" v-text="cancel">取消</a>
        </div>

        <slot>
        </slot>
    </div>
</template>

<script>
    import Cell from '../cell/index';

    export default {
        name: 'wue-search',

        components: {
            'wue-cell': Cell
        },

        props: {
            value: String | Number,
            focus: Boolean,
            placeholder: {
                type: String,
                default: '搜索'
            },
            cancel: {
                type: String | Number,
                default: '取消'
            },
        },

        data () {
            return {
                activated: false,
                currentValue: this.value,
                cell: false
            }
        },
        

        mounted () {
            
            const self = this;
            
            if (this.focus) {
                this.$refs.input.focus();
                this.activated = true;
            }

            this.$refs.input.onblur = function () {
                if(!self.currentValue.trim()){
                    self.activated = false;
                }

                self.$emit('change', self.currentValue);
            };
        },

        methods: {
            textClick () {
                this.$refs.input.focus();
                this.activated = true;
            },

            // 清除输入
            searchClear () {
                this.currentValue = '';
            },

            // 取消搜索
            searchCancel () {
                this.searchClear();
                this.activated = false;
            },

            onItemClick(item){
                this.currentValue = item;
            }
        },

        watch: {
            currentValue (val) {
                this.$emit('input', val);
            },

            value (val) {
                this.currentValue = val;
            },
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
    @import '../../styles/widget/weui-searchbar/weui-searchbar.less';
</style>
