<template>
    <div v-transform="value" style="width: 200px; height: 200px; background: red;"></div>
</template>

<style lang="less">

</style>

<script>
    export default {
        data() {
            return {
               value: {
                   translateX: 1,
                   translateY: 1,
               }
            }
        },

        watch: {
            value (newVal) {
                console.log(newVal);
            }
        },

        created(){
            const self = this;
            
            setInterval(function () {
                self.value.translateX += 1;
                self.value.translateY += 1;
            }, 16.6);
        },

        methods: {
           
        },
        components: {
        }
    }
</script>
