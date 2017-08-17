<template>
    
    <div>
        <div class="search-bar" :class="{'search-bar_focusing': activated}">
            <div class="search-bar__form">
                <div class="search-bar__box">
                    <i class="icon-search"></i>
                    <input type="text" class="search-bar__input" :placeholder="placeholder" v-model="currentValue" ref="input">
                    <a href="javascript:" class="icon-clear" @click="searchClear"></a>
                </div>
                <label class="search-bar__label" @click="textClick" v-show="!activated">
                    <i class="icon-search"></i>
                    <span v-text="placeholder"></span>
                </label>
            </div>
            <a href="javascript:" class="search-bar__cancel-btn" @click="searchCancel" v-show="activated" v-text="cancel">取消</a>
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
    @import '../../styles/icon/icon.less';
    @import '../../styles/widget/searchbar/searchbar.less';
</style>
