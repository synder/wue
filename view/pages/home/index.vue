<template>
    <div>
        <wue-avatar v-model="value"></wue-avatar>
        <wue-alert v-model="value"></wue-alert>
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
           
            this.$toptip.show('显示');
           
          
        }
    }
</script>
