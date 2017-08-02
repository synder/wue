<template>
    <wue-cells>
        <wue-radio-cell :options="options" v-model="value"></wue-radio-cell>
        <wue-checkbox-cell :options="options" v-model="check"></wue-checkbox-cell>
        <wue-switch-cell  v-model="switches">你好</wue-switch-cell>
        <wue-textarea-cell  v-model="value">你好</wue-textarea-cell>
        <wue-swipe-cell icon="/img/logo.png" id="show" @swipe-button-click="onClick">
            查看
        </wue-swipe-cell>
    </wue-cells>
</template>

<style lang="less">

</style>

<script>

    import cells from '../../../src/components/cells/index.vue';
    import radio from '../../../src/components/cell/radio.vue';
    import checkbox from '../../../src/components/cell/checkbox.vue';
    import switches from '../../../src/components/cell/switch.vue';
    import textarea from '../../../src/components/cell/textarea.vue';
    import swipe from '../../../src/components/cell/swipe.vue';


    export default {
        data() {
            return {
                value: '女',
                check: ['男', '女'],
                options: [
                    '男',
                    '女'
                ],
                switches: true
            }
        },

        watch: {
            value (newVal) {
                console.log(newVal);
            }
        },

        created(){

        },

        methods: {
            onClick: function (obj, text) {
                console.log(obj, text);
            }
        },
        components: {
            'wue-cells': cells,
            'wue-radio-cell': radio,
            'wue-checkbox-cell': checkbox,
            'wue-switch-cell': switches,
            'wue-textarea-cell': textarea,
            'wue-swipe-cell': swipe,
        }
    }
</script>
