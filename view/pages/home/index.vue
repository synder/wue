<template>
    <div>
        <wue-avatar v-model="avatar"></wue-avatar>
        <wue-alert v-model="value" :title="count"></wue-alert>
        <wue-picker @change="onClick" :visible="true" :options="options"></wue-picker>
    </div>
    
</template>

<script type="text/babel">

    import avatar from '../../../src/components/avatar/index.vue';
    import alert from '../../../src/components/alert/index.vue';
    import picker from '../../../src/components/picker/index.vue';
    
    
    export default {
        components: {
           'wue-avatar': avatar,
           'wue-alert': alert,
           'wue-picker': picker,
        },
        data() {
            
            let temp = {
                1: []
            };
            
            for(let i = 0; i < 1000; i++){
                temp['1'].push(i + '-' + Math.random());
            }
            
            return {
                value: true,
                avatar: '/img/logo.png',
                options: temp
            }
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

        methods: {
            onClick(file, result){
                return result;
            }
        },

        mounted(){
           
            this.$toptip.show('显示');
           
          
        }
    }
</script>
