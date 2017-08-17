<template>
    <div>
        <wue-avatar background="red" v-model="value" url="/upload" :upload="true" :on-success="success"></wue-avatar>
    </div>
</template>

<script type="text/babel">
    import avatar from '../../../src/components/avatar/common.vue';

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