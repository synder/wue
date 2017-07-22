```
<template>
    <wue-scroll-tab>
        <wue-scroll-tab-panel v-for="item in list" :label="item.label" :icon="item.icon" :active="item.active">
            <div style="height: 350px;" :style="{backgroundColor: item.color}">{{item.label}}</div>
        </wue-scroll-tab-panel>
    </wue-scroll-tab>
</template>

<style lang="less">

</style>

<script>

    import tab from '../../../src/components/tab/index.vue';
    import panel from '../../../src/components/tab/panel.vue';


    export default {
        data() {
            return {
                value: true,
                list: [
                    {label: '空调', icon: 'demo-icons-category1', color: 'gray'},
                    {label: '冰箱', icon: 'demo-icons-category2', color: 'blue'},
                    {label: '洗衣机', icon: 'demo-icons-category3', color: 'yellow'},
                    {label: '热水器', icon: 'demo-icons-category4', color: 'green'},
                    {label: '厨房大家电', icon: 'demo-icons-category5', color: 'saddlebrown'},
                    {label: '厨房小家电', icon: 'demo-icons-category6', color: 'darkgoldenrod'},
                    {label: '生活家电', icon: 'demo-icons-category7', color: 'indianred'},
                    {label: '风扇', icon: 'demo-icons-category8', color: 'aqua'}
                ]
            }
        },

        watch: {
            value (newVal) {
                console.log(newVal);
            }
        },
        
        created(){
            const self = this;
            
            
        },
        
        methods: {
            onDone: function () {
               console.log(arguments);
            }
        },
        components: {
            'wue-scroll-tab': tab,
            'wue-scroll-tab-panel': panel,
        }
    }
</script>
```