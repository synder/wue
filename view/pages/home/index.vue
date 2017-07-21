<template>
    <wue-city-picker v-model="value" :done="onDone" province="新疆" city="乌鲁木齐市" area="天山区"></wue-city-picker>
</template>

<style lang="less">

</style>

<script>

    import city from '../../../src/components/picker/city.vue';


    export default {
        data() {
            return {
                value: true,
            }
        },

        watch: {
            value (newVal) {
                console.log(newVal);
            }
        },
        
        created(){
            const self = this;
            
            
        },
        
        methods: {
            onDone: function () {
               console.log(arguments);
            }
        },
        components: {
            'wue-city-picker': city,
        }
    }
</script>