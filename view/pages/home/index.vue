<template>
    <div>
        <wue-avatar v-model="avatar"></wue-avatar>
        <wue-alert v-model="value" :title="count"></wue-alert>
    </div>
    
</template>

<script type="text/babel">

    import avatar from '../../../src/components/avatar/index.vue';
    import alert from '../../../src/components/alert/index.vue';
    
    export default {
        components: {
           'wue-avatar': avatar,
           'wue-alert': alert,
        },
        data() {
            return {
                value: true,
                avatar: '/img/logo.png'
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
            success(file, result){
                return result;
            }
        },

        mounted(){
           
            this.$toptip.show('显示');
           
          
        }
    }
</script>
