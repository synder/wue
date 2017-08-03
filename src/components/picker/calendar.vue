<template>
    <wue-picker v-model="visibleValue" :title="showTitle" :height="height + 'px'">
        <div class="wue-inline-calendar">
            <div class="wue-calendar-header">
                <div class="wue-calendar-year">
                            <span @click="prevYear">
                              <a class="year-prev wue-prev-icon" href="javascript:"></a>
                            </span>
                    <a class="wue-calendar-year-txt wue-calendar-title" href="javascript:"
                       v-text="year"></a>
                    <span class="wue-calendar-header-right-arrow" @click="nextYear">
                                <a class="year-next wue-next-icon" href="javascript:"></a>
                            </span>
                </div>

                <div class="wue-calendar-month">
                            <span @click="prevMonth">
                              <a class="month-prev wue-prev-icon" href="javascript:"></a>
                            </span>
                    <a class="wue-calendar-month-txt wue-calendar-title" href="javascript:"
                       v-text="month"></a>
                    <span @click="nextMonth" class="wue-calendar-header-right-arrow">
                                <a class="month-next wue-next-icon" href="javascript:"></a>
                            </span>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th v-for="val in weeks" class="wue-calendar-week" v-text="val"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="rows in days">
                    <td v-for="day in rows" @click="select(day)"
                        :class="{'is-disabled': day.disable, 'is-today': day.today, 'current': day.current}">
                        <slot name="day">
                            <span class="wue-wue-calendar-each-date" v-text="day.date"></span>
                            <div></div>
                        </slot>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </wue-picker>
</template>

<script>
    import WuePicker from "./index";
    export default {
        components: {WuePicker},
        name: 'wue-calendar-picker',
        props: {
            value: Boolean,
            init: {
                type: Date | String | Number,
            },
            weeks: {
                type: Array,
                default () {
                    return ['日', '一', '二', '三', '四', '五', '六']
                }
            },
            height: {
                type: Number,
                default: 290
            },
            title: {
                type: String,
                default: '选择日期'
            }
        },
        data () {
            return {
                currentValue: this.init ? new Date(this.init) : new Date(),
                days: [],
                showTitle: this.title,
                visibleValue: !!this.value
            }
        },
        created () {
            this.currentValue = this.init ? new Date(this.init) : new Date();
            this.days = this.getMonthDays(this.currentValue);
        },
        mounted () {
            const self = this;
            const element = self.$el;
            let startX, startY, moveEndX, moveEndY;

            element.addEventListener('touchstart', function (event) {
                event.preventDefault();
                let touch = event.changedTouches[0] || event.touches[0];

                startX = touch.clientX;
                startY = touch.clientY;
                event.returnValue = true;

            });

            element.addEventListener('touchend', function (event) {
                event.preventDefault();
                let touch = event.changedTouches[0] || event.touches[0];

                moveEndX = touch.clientX;
                moveEndY = touch.clientY;

                let X = moveEndX - startX;
                let Y = moveEndY - startY;

                if (Math.abs(X) > 30 || Math.abs(Y) > 30) {
                    if (Math.abs(X) > Math.abs(Y) && X > 0) {
                        self.prevMonth();
                    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                        self.nextMonth();
                    } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                        self.nextYear();
                    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                        self.prevYear();
                    } else {
                        event.returnValue = true;
                    }
                } else {
                    event.returnValue = true;
                }

            });
        },
        computed: {
            year(){
                return this.currentValue.getFullYear(this.currentValue);
            },

            month(){
                return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'][this.currentValue.getMonth()];
            },
        },
        watch: {
            value (val) {
                this.visibleValue = !!val;
            },
            visibleValue(val){
                this.$emit('input', val);
            },

            currentValue (val) {
                if (val instanceof Date) {
                    this.currentValue = val;
                } else {
                    this.currentValue = val ? new Date(val) : new Date();
                }

                this.currentValue.setHours(0);
                this.currentValue.setMinutes(0);
                this.currentValue.setSeconds(0);
                this.currentValue.setMilliseconds(0);

                this.showTitle = this.currentValue.getFullYear() + '/' + this.zero(this.currentValue.getMonth() + 1) + '/' + this.zero(this.currentValue.getDate());

                this.$emit('selected', this.currentValue);
            },

        },
        methods: {

            open(){
                this.visibleValue = true;
            },

            zero(value){
                if (value < 10) {
                    return '0' + value;
                } else {
                    return value;
                }
            },

            onHidden(){
                this.visibleValue = false;
            },

            getMonthDayCount(time) {

                time = new Date(time);

                let year = time.getFullYear();
                let month = time.getMonth() + 1;

                let days = 30;

                if (month === 2) {
                    days = (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
                } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
                    days = 31;
                } else {
                    days = 30;
                }

                return days;
            },

            getMonthDays(time){
                let temp = new Date(time);

                if (this.days.length !== 0) {
                    if (this.currentValue.getFullYear() === temp.getFullYear()
                        && this.currentValue.getMonth() === temp.getMonth()
                        && this.currentValue.getDate() === temp.getDate()) {
                        this.currentValue = time;
                        return this.days;
                    }
                }

                this.currentValue = time;
                let totalDayCount = this.getMonthDayCount(temp);

                temp.setDate(1);
                let startDateWeek = temp.getDay();

                temp.setDate(this.getMonthDayCount(temp));
                let endDateWeek = temp.getDay();

                let result = [];

                if (startDateWeek > 0) {
                    let preMonthTime = new Date(time);
                    preMonthTime.setMonth(preMonthTime.getMonth() - 1);

                    let preMonthDayCount = this.getMonthDayCount(preMonthTime);

                    for (let i = preMonthDayCount - startDateWeek + 1; i <= preMonthDayCount; i++) {
                        result.push({
                            date: i,
                            month: preMonthTime.getMonth(),
                            year: preMonthTime.getFullYear(),
                            week: preMonthTime.getDay(),
                            disable: true,
                            today: false
                        });
                    }
                }

                for (let i = 1; i <= totalDayCount; i++) {
                    let nowTime = new Date();
                    let timeTemp = new Date(time);
                    result.push({
                        date: i,
                        month: timeTemp.getMonth(),
                        year: timeTemp.getFullYear(),
                        week: timeTemp.getDay(),
                        disable: false,
                        today: nowTime.getDate() === i && nowTime.getMonth() === timeTemp.getMonth() && nowTime.getFullYear() === timeTemp.getFullYear(),
                        current: timeTemp.getDate() === i
                    });
                }

                if (endDateWeek < 6) {
                    let nextMonthTime = new Date(time);
                    nextMonthTime.setMonth(nextMonthTime.getMonth() + 1);

                    for (let i = 1; i <= (6 - endDateWeek); i++) {
                        result.push({
                            date: i,
                            month: nextMonthTime.getMonth(),
                            year: nextMonthTime.getFullYear(),
                            week: nextMonthTime.getDay(),
                            disable: true,
                            today: false
                        });
                    }
                }

                let showResult = [];
                let rowTemp = [];

                for (let i = 0; i < result.length; i++) {
                    if (i > 0 && i % 7 === 0) {
                        showResult.push(rowTemp);
                        rowTemp = [];
                    }

                    rowTemp.push(result[i]);
                }

                if (rowTemp.length > 0) {
                    showResult.push(rowTemp);
                    rowTemp = [];
                }

                return showResult;
            },


            nextMonth(){
                let temp = new Date(this.currentValue);
                temp.setMonth(temp.getMonth() + 1);
                this.days = this.getMonthDays(temp);
            },

            nextYear(){
                let temp = new Date(this.currentValue);
                temp.setFullYear(temp.getFullYear() + 1);
                this.days = this.getMonthDays(temp);
            },

            prevMonth(){
                let temp = new Date(this.currentValue);
                temp.setMonth(temp.getMonth() - 1);
                this.days = this.getMonthDays(temp);
            },

            prevYear(){
                let temp = new Date(this.currentValue);
                temp.setFullYear(temp.getFullYear() - 1);
                this.days = this.getMonthDays(temp);
            },

            select(day){
                let temp = new Date(this.currentValue);
                temp.setFullYear(day.year);
                temp.setMonth(day.month);
                temp.setDate(day.date);
                this.days = this.getMonthDays(temp);
            }
        }
    }
</script>

<style lang="less" scoped>

    @import '../../styles/base/reset.less';
    @import '../../styles/vue/transition.less';
    @import '../../styles/widget/weui-tips/weui-mask.less';
    @import '../../styles/widget/weui-animate/weui-animate.less';
    @import '../../styles/widget/weui-picker/weui-picker.less';

    //use
    @wue-calendar-arrow-color: #04BE02;
    @wue-calendar-highlight-color: #E59313;
    @wue-calendar-today-font-color: #04BE02;
    @wue-calendar-date-item-font-size: 16px;
    @wue-calendar-selected-bg-color: #04BE02;
    @wue-calendar-disabled-font-color: #c0c0c0;
    

    .wue-calendar-year > span, .wue-calendar-month > span {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        padding: 8px;
        width: 24px;
        height: 24px;
    }

    .wue-calendar-year > span.wue-calendar-header-right-arrow, .wue-calendar-month > span.wue-calendar-header-right-arrow {
        left: auto;
        right: 0;
    }

    .wue-prev-icon, .wue-next-icon {
        position: absolute;
        left: 0;
        top: 15px;
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 1px solid @wue-calendar-arrow-color;
        border-radius: 0;
        border-top: none;
        border-right: none;
        transform: rotate(45deg);
        margin-left: 15px;
        line-height: 40px;
    }

    .wue-next-icon {
        transform: rotate(-135deg);
        left: auto;
        top: 14px;
        right: 15px;
    }

    .wue-inline-calendar a {
        text-decoration: none;
        tap-highlight-color: rgba(0, 0, 0, 0);
        margin-bottom: 1rem;
    }

    .wue-calendar-year, .wue-calendar-month {
        position: relative;
    }

    .wue-calendar-header {
        line-height: 40px;
        font-size: 1.2em;
        overflow: hidden;
    }

    .wue-calendar-header > div {
        float: left;
        width: 50%;
        text-align: center;
        overflow: hidden;
    }

    .wue-calendar-header span:last-of-type {
        float: right;
        vertical-align: bottom;
    }

    .wue-calendar-title {
        padding: 0 6%;
        color: #333;
    }

    .wue-calendar-week {
        overflow: hidden;
    }

    .wue-calendar-week span {
        float: left;
        width: 14.28%;
        font-size: 1.6em;
        line-height: 34px;
        text-align: center;
    }

    .wue-inline-calendar {
        width: 100%;
        background: #fff;
        border-radius: 2px;
        transition: all .5s ease;
    }

    .wue-inline-calendar td.is-today, .wue-inline-calendar td.is-today.is-disabled {
        color: @wue-calendar-today-font-color;
    }

    .wue-calendar-enter, .wue-calendar-leave-active {
        opacity: 0;
        transform: translate3d(0, -10px, 0);
    }

    .wue-inline-calendar table {
        clear: both;
        width: 100%;
        border-collapse: collapse;
        color: #444444;
    }

    .wue-inline-calendar td {
        padding: 5px 0;
        text-align: center;
        vertical-align: middle;
        font-size: @wue-calendar-date-item-font-size;
        position: relative;
    }

    .wue-inline-calendar td.week {
        pointer-events: none !important;
        cursor: default !important;
    }

    .wue-inline-calendar td.is-disabled {
        color: @wue-calendar-disabled-font-color;
    }

    .wue-inline-calendar td > span.wue-wue-calendar-each-date {
        display: inline-block;
        width: 26px;
        height: 26px;
        line-height: 26px;
        border-radius: 50%;
        text-align: center;
    }

    .wue-inline-calendar td.current > span.wue-wue-calendar-each-date {
        background-color: @wue-calendar-selected-bg-color;
        color: #fff !important;
    }
</style>
