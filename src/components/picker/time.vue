<template>
    <wue-picker @selected="onSelected" title="选择时间" v-model="visible" :options="options" @cancel="hide" @confirm="hide"></wue-picker>
</template>

<style lang="less" scoped>
    @import "../../styles/base/reset.less";
</style>

<script>

    import Picker from './index.vue';

    export default {
        name: 'wue-time-picker',

        props:{
            value: Boolean
        },

        data() {
            return {
                hour: (new Date()).getHours(),
                minute: (new Date()).getMinutes(),
                second: (new Date()).getSeconds(),
                visible: !!this.value,
                options: {
                    hour: this.hours(),
                    minute: this.minutes(),
                    second: this.seconds()
                }
            }
        },

        watch: {
            value(val){
                this.visible = !!val;
            },

            visible(val){
                this.$emit('input', val);
            }
        },

        methods: {
            onSelected: function (obj) {

                if(obj){
                    this.hour = obj.hour ? obj.hour : this.hour;
                    this.minute = obj.minute ? obj.minute : this.minute;
                    this.second = obj.second ? obj.second : this.second;

                    this.$emit('change', {
                        hour: this.hour,
                        minute: this.minute,
                        second: this.second,
                    });
                }
                
            },

            hours(){
                let result = [];
                for (let i = 1; i < 25; i++) {
                    result.push(i + '时');
                }
                return result;
            },

            minutes(){
                let result = [];
                for (let i = 1; i < 61; i++) {
                    result.push(i + '分');
                }

                return result;
            },

            seconds(){
                let result = [];
                for (let i = 1; i < 61; i++) {
                    result.push(i + '秒');
                }

                return result;
            },
            hide(){
                this.visible = false;
            }
        },
        components: {
            'wue-picker': Picker
        }
    }
</script>