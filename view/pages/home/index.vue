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
            let toast = this.$toast.show('正在加载中');
        }
    }
</script>
