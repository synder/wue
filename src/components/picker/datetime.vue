<template>
    <wue-picker @selected="onSelected" title="选择时期" v-model="visible" :options="options" @cancel="hide" @confirm="hide"></wue-picker>
</template>

<style lang="less" scoped>
    @import "../../styles/base/reset.less";
</style>

<script>

    import WuePicker from './index.vue';

    export default {
        name: 'wue-datetime-picker',

        components: {
            WuePicker
        },

        props:{
            value: Boolean
        },

        data() {
            return {
                year: (new Date()).getFullYear(),
                month: (new Date()).getMonth() + 1,
                day: (new Date()).getDate() + 1,
                hour: (new Date()).getHours(),
                minute: (new Date()).getMinutes(),
                visible: !!this.value,
                options: {
                    year: this.years(),
                    month: this.months(),
                    day: this.days(this.month),
                    hour: this.hours(),
                    minute: this.minutes(),
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
                    this.year = obj.year ? obj.year : this.year;
                    this.month = obj.month ? obj.month : this.month;
                    this.day = obj.day ? obj.day : this.day;

                    this.options.day = this.days(this.year, this.month);

                    this.$emit('change', {
                        year: this.year,
                        month: this.month,
                        day: this.day,
                    });
                }
            },

            years(){
                let now = new Date();
                let year = now.getFullYear();

                let result = [];

                for (let i = year - 30; i < year + 30; i++) {
                    result.push(i);
                }

                return result;
            },

            months(){
                return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            },

            days(year, month){
                let days;

                month = parseInt(month);

                if (month === 2) {
                    days = (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
                } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
                    days = 31;
                } else {
                    days = 30;
                }

                let result = [];

                for(let i = 1; i < days + 1; i++){
                    result.push(i);
                }

                return result;
            },

            hours(){
                let result = [];
                for (let i = 1; i < 25; i++) {
                    result.push(i);
                }
                return result;
            },

            minutes(){
                let result = [];
                for (let i = 1; i < 61; i++) {
                    result.push(i);
                }

                return result;
            },

            hide(){
                this.visible = false;
            }
        }
    }
</script>