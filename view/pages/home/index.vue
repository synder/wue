<template>

</template>

<script type="text/babel">

    export default {
        components: {
           
        },
        data() {
            return {
                value: '/img/logo.png'
            }
        },
        watch: {
            value(val){
                console.log(val);
            }
        },

        methods: {
            success(file, result){
                return result;
            }
        },

        mounted(){
           
            this.$toptip.show('显示');
           
          
        }
    }
</script>
