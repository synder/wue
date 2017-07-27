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
            const self = this;
            setInterval(function () {
                if(Math.random() > 0.5){
                    self.$toptip.show('正在加载中');
                }else{
                    self.$toast.show('正在加载中');
                }
            }, 2000);
           
          
        }
    }
</script>
