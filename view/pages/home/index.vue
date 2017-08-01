<template>
    <wue-fullpage :direction="true" :indicator="true">
        <wue-fullpage-page bg="red">
            <div>show</div>
        </wue-fullpage-page>
        <wue-fullpage-page bg="blue">
            <div>show</div>
        </wue-fullpage-page>
        <wue-fullpage-page bg="green"></wue-fullpage-page>
        <wue-fullpage-page bg="yellow"></wue-fullpage-page>
        <wue-fullpage-page bg="pink"></wue-fullpage-page>
        <div></div>
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
                selected: 'item1'
            }
        },

        methods: {
            handle(){

            }
        },

        mounted(){

        }
    }
</script>
