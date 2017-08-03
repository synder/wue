<template>
    <div style="height: 1000px;">
        <wue-button @click="showCalendar">calendar</wue-button>
        <wue-button @click="showCity">city</wue-button>
        <wue-button @click="showColor">clor</wue-button>
        <wue-button @click="showDate">clor</wue-button>
        
        <wue-calendar-picker :init="new Date()" v-model="calendarVisible" @selected="onSelected"></wue-calendar-picker>
        <wue-city-picker v-model="cityVisible" @selected="onSelected" province="新疆" city="乌鲁木齐市" area="天山区"></wue-city-picker>
        <wue-color-picker v-model="colorVisible" @selected="onSelected"></wue-color-picker>
        <wue-date-picker v-model="dateVisible" @selected="onSelected"></wue-date-picker>
    </div>

</template>

<script type="text/babel">
    import WueCalendarPicker from "../../../src/components/picker/calendar";
    import WueButton from "../../../src/components/button/index";
    import WueCityPicker from "../../../src/components/picker/city";
    import WueColorPicker from "../../../src/components/picker/color";
    import WueDatePicker from "../../../src/components/picker/date";


    export default {
        components: {
            WueDatePicker,
            WueColorPicker,
            WueCityPicker,
            WueButton,
            WueCalendarPicker,
        },
        data() {
            return {
                date: new Date(),
                calendarVisible: false,
                cityVisible: false,
                colorVisible: false,
                dateVisible: false
            };
        },

        methods: {
            showCalendar(){
                this.calendarVisible = true;
            },

            showCity(){
                this.cityVisible = true;
            },

            showColor(){
                this.colorVisible = true;
            },

            showDate(){
                this.dateVisible = true;
            },

            onSelected(value){
                console.log(value);
            }
        },

        mounted(){

        }
    }
</script>