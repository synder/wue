<template>
    <select class="weui-select" v-model="currentValue">
        <option v-for="(option, index) in options" :value="index" v-text="option"></option>
    </select>
</template>

<style lang="less" scoped>
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-cell/weui-form/weui-select.less';
</style>

<script>

    export default {
        name: 'wue-select',
        
        props: {
            value: {
                type: Number,
                required: true,
            },
            options: {
                type: Array,
                required: true
            }
        },
        
        data(){
            return {
                currentValue : this.value
            };
        },
        
        watch: {
            currentValue(value){
                this.$emit('input', value);
            },

            value(val){
                this.currentValue = val;
            }
        }
    }

</script>
