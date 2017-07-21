<template>
    <div>
        <wue-picker @change="onChange" title="选择时间" :visible="visible" :options="options"></wue-picker>
    </div>
</template>

<style lang="less">

</style>

<script>

    import Picker from './index.vue';

    export default {
        name: 'wue-date-picker',

        props:{
            visible: Boolean
        },

        data() {
            return {
                hour: (new Date()).getHours(),
                minute: (new Date()).getMinutes(),
                second: (new Date()).getSeconds(),

                options: {
                    hour: this.hours(),
                    minute: this.minutes(),
                    second: this.seconds()
                }
            }
        },

        watch: {

        },

        methods: {
            onChange: function (obj) {

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
        },
        components: {
            'wue-picker': Picker
        }
    }
</script>