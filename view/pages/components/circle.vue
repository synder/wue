<template>
    <div>
        <wue-circle :line-width="3" :value="value"></wue-circle>
        <wue-circle :line-width="10" :value="value"></wue-circle>
        <wue-circle :diameter="200" :line-width="10" :value="value"></wue-circle>
        <wue-circle :diameter="200" :line-width="10" stroke-color="#ff0000" :value="value"></wue-circle>
    </div>
  
</template>

<style lang='less' scoped>

</style>

<script>
    import WueCircle from "../../../src/components/circle/index";
    
    export default {
        components: {
            WueCircle
        },
        name: '',

        props: {},

        data(){
            return {value: 0};
        },

        computed: {},

        methods: {},

        watch: {},

        mounted(){
            let t = setInterval(function () {
                if(this.value === 100){
                    return clearInterval(t);
                }
                
                this.value  += 1;
                
            }.bind(this), 200)
        }
    }
</script>