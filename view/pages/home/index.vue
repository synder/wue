<template>
    <wue-icon name="back" color="red"></wue-icon>
</template>

<script>
    import icon from '../../../src/components/icon/index.vue';
    import WueIcon from "../../../src/components/icon/index";

    export default {
        components: {
            WueIcon,
            'wue-icon': icon,
        },
        data () {
            return {
                step1: 1,
                step2: 0
            }
        },
        methods: {
            nextStep () {
                this.step2 ++
            }
        }
    }
</script>

<style lang="less">
    .btn_wrap {
        padding: 0 1rem;
        margin-top: 2rem;
    }
</style>
