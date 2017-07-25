<template>
    <div>
        <wue-avatar background="red" v-model="value" url="/upload" :upload="true" :on-success="success"></wue-avatar>
    </div>
</template>

<script type="text/babel">
    import avatar from '../../../src/components/avatar/index.vue';
    
    export default {
        components: {
            'wue-avatar': avatar
        },
        data() {
            return {
                value: '/img/logo.png'
            }
        },
        watch: {
            
        },
        
        methods: {
            success(file, result){
                console.log(file, result);
                return result;
            }
        }
    }
</script>
