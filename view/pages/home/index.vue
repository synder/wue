<template>
    <wue-navbar v-model="selected" fixed>
        <wue-navbar-item id="item1" @on-item-click="handle">选项1</wue-navbar-item>
        <wue-navbar-item id="item2" @on-item-click="handle">选项2</wue-navbar-item>
        <wue-navbar-item id="item3" @on-item-click="handle">选项3</wue-navbar-item>
    </wue-navbar>
</template>

<style lang="less">

</style>

<script>

    import navbar from '../../../src/components/navbar/index.vue';
    import item from '../../../src/components/navbar/item.vue';


    export default {
        data() {
            return {
                selected: 'item1',
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
            'wue-navbar': navbar,
            'wue-navbar-item': item,
        }
    }
</script>