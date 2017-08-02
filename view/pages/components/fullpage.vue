<template>
    <wue-fullpage :direction="false" :indicator="true" v-model="value">
        <wue-fullpage-page bg="red">
            <div>show</div>
            <div>show</div>
            <div>show</div>
        </wue-fullpage-page>
        <wue-fullpage-page bg="blue">
            <div>show</div>
        </wue-fullpage-page>
        <wue-fullpage-page bg="green"></wue-fullpage-page>
        <wue-fullpage-page bg="yellow"></wue-fullpage-page>
        <wue-fullpage-page bg="pink"></wue-fullpage-page>
    </wue-fullpage>
</template>

<script>
    import WueFullpage from "../../../src/components/fullpage/index";
    import WueFullpagePage from "../../../src/components/fullpage/page";

    export default {
        components: {
            WueFullpagePage,
            WueFullpage,
        },
        data () {
            return {
                value: 2
            }
        },

        watch: {
            value(val){
                console.log(val);
            }
        },

        methods: {

        },

        mounted(){
            const self = this;
        }
    }
</script>