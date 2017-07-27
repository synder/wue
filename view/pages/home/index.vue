<template>

</template>

<script type="text/babel">

    import  {Store} from '../../../src/plugins/storage/index.js';
    
    

    export default {
        components: {
           
        },
        data() {
            return {
                value: '/img/logo.png'
            }
        },
        watch: {
            value(val){
                console.log(val);
            }
        },

        methods: {
            success(file, result){
                return result;
            }
        },

        mounted(){
            let store = new Store(window.localStorage);
            
            store.set('info', {
                name: 1,
                age: 2,
                show: true
            }, 10000);

            console.log(store.get('info'));
            console.log(store.ttl('info'));

            setTimeout(function () {
                console.log(store.get('info'));
            }, 200);
          
        }
    }
</script>
