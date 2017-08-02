<template>
    <div>
        <wue-grid :rows="3">
            <wue-grid-item label="x" v-for="i in 3" :key="i">
                <img slot="icon" src="/img/logo.png">
            </wue-grid-item>
        </wue-grid>

        <wue-grid :rows="4">
            <wue-grid-item label="x" v-for="i in 4" :key="i">
                <img slot="icon" src="/img/logo.png">
            </wue-grid-item>
        </wue-grid>

        <wue-grid :rows="5">
            <wue-grid-item label="x" v-for="i in 5" :key="i">
                <img slot="icon" src="/img/logo.png">
            </wue-grid-item>
        </wue-grid>
    </div>
</template>

<style lang='less' scoped>

</style>

<script>
    import WueGridItem from "../../../src/components/grid/item";
    import WueGrid from "../../../src/components/grid/index";
    export default {
        components: {
            WueGrid,
            WueGridItem
        },
        name: '',

        props: {},

        data(){
            return {};
        },

        computed: {},

        methods: {},

        watch: {},

        mounted(){

        }
    }
</script>