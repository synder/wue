<template>
    <div>
        <wue-navbar v-model="selected" fixed>
            <wue-navbar-item :id="1" @on-item-click="handle">选项1</wue-navbar-item>
            <wue-navbar-item :id="2" @on-item-click="handle">选项2</wue-navbar-item>
            <wue-navbar-item :id="3" @on-item-click="handle">选项3</wue-navbar-item>
        </wue-navbar>
        
        <wue-group v-model="selected" style="padding-top: 45px;">
            <wue-group-item :id="1">1</wue-group-item>
            <wue-group-item :id="2">2</wue-group-item>
            <wue-group-item :id="3">3</wue-group-item>
        </wue-group>
    </div>
    
</template>

<style lang="less">

</style>

<script>

    import navbar from '../../../src/components/navbar/index.vue';
    import item from '../../../src/components/navbar/item.vue';
    import WueGroup from "../../../src/components/groups/index";
    import WueGroupItem from "../../../src/components/groups/item";


    export default {
        data() {
            return {
                selected: 1,
            }
        },

        watch: {
            selected (newVal) {
                console.log('a', newVal);
            }
        },

        created(){


        },

        methods: {
            handle: function (id) {

            },



        },
        components: {
            WueGroupItem,
            WueGroup,
            'wue-navbar': navbar,
            'wue-navbar-item': item,
        }
    }
</script>