<template>
    <div>
        <wue-header>你好</wue-header>
        <wue-ribbon text="测试">
            <div>
                show
            </div>
        </wue-ribbon>
    </div>

</template>

<script type="text/babel">
    import header from "../../../src/components/header/index.vue";
    import ribbon from "../../../src/components/ribbon/index.vue";


    export default {
        components: {
            'wue-header': header,
            'wue-ribbon': ribbon,
        },
        data() {
            return {
                value: new Date()
            };
        },
        watch: {
            value(val){
                console.log(val);
            }
        },

        computed: {
            count(){
                return this.$store.state.count
            }
        },

        methods: {},

        mounted(){
            console.log(this);
        }
    }
</script>
