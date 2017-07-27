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
            this.$confirm.show('你确认要展示', '已经删除', function (result) {
                console.log(result);
            });
        }
    }
</script>
