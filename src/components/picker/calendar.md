```
<template>
    <div>
       <wue-calendar-picker v-model="value" :visible="true"></wue-calendar-picker>
    </div>
    
</template>

<script type="text/babel">
    import WueCalendarPicker from "../../../src/components/picker/calendar";
    
    
    export default {
        components: {
            WueCalendarPicker,
        },
        data() {
            return {
                value: new Date()
            };
        },
        watch: {
            value(val){
                console.log(val);
            }
        },
        
        computed: {
            count(){
                return this.$store.state.count
            }
        },

        methods: {
        },

        mounted(){
      
        }
    }
</script>

```