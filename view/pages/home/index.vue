<template>
    <div>
        <wue-avatar :width="300" :height="300" background="red" v-model="value" url="/upload" :upload="true" :on-success="success"></wue-avatar>
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
            value(val){
                console.log(val);
            }
        },
        
        methods: {
            success(file, result){
                return result;
            }
        }
    }
</script>
