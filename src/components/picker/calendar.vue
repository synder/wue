<template>
    <div v-show="visible">
        <div class="weui-mask weui-animate-fade-in"></div>
        <div class="weui-picker weui-animate-slide-up">
            <div class="weui-picker__hd">
                <a class="weui-picker__action" @click="onHidden">取消</a>
                <span v-text="title"></span>
                <a class="weui-picker__action" @click="onHidden">确认</a>
            </div>
            <div class="weui-picker__bd" :style="{height: height + 'px'}">
                <div class="wue-inline-calendar">
                    <div class="wue-calendar-header">
                        <div class="wue-calendar-year">
                <span @click="prevYear">
                  <a class="year-prev wue-prev-icon" href="javascript:"></a>
                </span>
                            <a class="wue-calendar-year-txt wue-calendar-title" href="javascript:" v-text="year"></a>
                            <span class="wue-calendar-header-right-arrow" @click="nextYear">
                    <a class="year-next wue-next-icon" href="javascript:"></a>
                </span>
                        </div>

                        <div class="wue-calendar-month">
                <span @click="prevMonth">
                  <a class="month-prev wue-prev-icon" href="javascript:"></a>
                </span>
                            <a class="wue-calendar-month-txt wue-calendar-title" href="javascript:" v-text="month"></a>
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-calendar',
        props: {
            value: {
                type: Date | String | Number,
            },
            weeks: {
                type: Array,
                default () {
                    return ['日', '一', '二', '三', '四', '五', '六']
                }
            },
            visible: {
                type: Boolean,
                default: false
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
                currentValue: this.value ? new Date(this.value) : new Date(),
                days: []
            }
        },
        created () {
            this.currentValue = this.value ? new Date(this.value) : new Date();
            this.days = this.getMonthDays();
        },
        mounted () {
            const self = this;
            const element = self.$el;
            let startX, startY, moveEndX, moveEndY;

            element.addEventListener('touchstart', function (event) {
                event.preventDefault();
                let touch = event.changedTouches[0] || event.touches[0];

                startX = touch.pageX;
                startY = touch.pageY;
                event.returnValue = true;
                
            }, false);

            element.addEventListener('touchend', function (event) {
                event.preventDefault();
                let touch = event.changedTouches[0] || event.touches[0];

                moveEndX = touch.pageX;
                moveEndY = touch.pageY;

                let X = moveEndX - startX;
                let Y = moveEndY - startY;
                
                if(Math.abs(X) > 50 || Math.abs(Y) > 50){
                    if ( Math.abs(X) > Math.abs(Y) &&  X > 0 ) {
                        self.prevMonth();
                    } else if ( Math.abs(X) > Math.abs(Y) && X < 50 ) {
                        self.nextMonth();
                    } else if ( Math.abs(Y) > Math.abs(X) && Y > 50) {
                        self.nextYear();
                    } else if ( Math.abs(Y) > Math.abs(X) && Y < 50 ) {
                        self.prevYear();
                    } else {
                        event.returnValue = true;
                    }
                }else{
                    event.returnValue = true;
                }
                
            }, false);
        },
        computed: {
            year(){
                return this.currentValue.getFullYear();
            },

            month(){
                return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'][this.currentValue.getMonth()];
            },
        },
        watch: {
            value (val) {
                if (val instanceof Date) {
                    this.currentValue = val;
                } else {
                    this.currentValue = val ? new Date(val) : new Date();
                }
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

                this.$emit('input', this.currentValue);
                this.$emit('change', this.currentValue);
            },
        },
        methods: {

            onHidden(){
                this.visible = false;
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

            getMonthDays(){

                let time = this.currentValue;

                let temp = new Date(time);

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
                this.currentValue = temp;
                this.days = this.getMonthDays();
            },

            nextYear(){
                let temp = new Date(this.currentValue);
                temp.setFullYear(temp.getFullYear() + 1);
                this.currentValue = temp;
                this.days = this.getMonthDays();
            },

            prevMonth(){
                let temp = new Date(this.currentValue);
                temp.setMonth(temp.getMonth() - 1);
                this.currentValue = temp;
                this.days = this.getMonthDays();
            },

            prevYear(){
                let temp = new Date(this.currentValue);
                temp.setFullYear(temp.getFullYear() - 1);
                this.currentValue = temp;
                this.days = this.getMonthDays();
            },

            select(day){
                let temp = new Date(this.currentValue);
                temp.setFullYear(day.year);
                temp.setMonth(day.month);
                temp.setDate(day.date);
                this.currentValue = temp;
                this.days = this.getMonthDays();
            }
        }
    }
</script>

<style lang="less" scoped>

    @import '../../styles/base/reset.less';
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
