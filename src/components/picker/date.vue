<template>
    <wue-picker @selected="onSelected" title="选择日期" v-model="visible" :options="options" @cancel="hide" @confirm="hide"></wue-picker>
</template>

<style lang="less" scoped>
    @import "../../styles/base/reset.less";
</style>

<script>

    import WuePicker from './index.vue';

    export default {
        name: 'wue-date-picker',
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
                options: {
                    year: this.years(),
                    month: this.months(),
                    day: this.days(this.month)
                },
                visible: !!this.value
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

                    this.$emit('selected', {
                        year: parseInt(this.year),
                        month: parseInt(this.month),
                        day: parseInt(this.day),
                    });
                }
            },

            years(){
                let now = new Date();
                let year = now.getFullYear();

                let result = [];

                for (let i = year - 30; i < year + 30; i++) {
                    result.push(i + '年');
                }

                return result;
            },

            months(){

                let result = [];

                for (let i = 1; i < 13; i++) {
                    result.push(i + '月');
                }
                
                return result;
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
                    result.push(i + '日');
                }
                
                return result;
            },

            hide(){
                this.visible = false;
            }
        },
    }
</script>