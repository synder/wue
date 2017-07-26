<template>
    <div>
        <wue-avatar :width="300" :height="300" background="red" v-model="value" url="/upload" :upload="true"
                    :on-success="success"></wue-avatar>
    </div>
</template>

<script type="text/babel">
    import avatar from '../../../src/components/avatar/index.vue';

    import {ajax, post, get, del, put} from '../../../src/plugins/ajax/index.js';

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
        },

        mounted(){

            ajax({
                url: '/ajax',
                method: 'post',
                data: {
                    name: 1
                },
                async: true,
                type: 'json',
                onSuccess: function (result) {
                   // console.log(result);
                },
                onError: function (result) {
                   // console.error(result);
                },
            });

            ajax({
                url: '/ajax',
                method: 'POST',
                data: {
                    name: 1,
                    sam: '余伟'
                },
                async: true,
                type: 'form',
                onSuccess: function (result) {
                    //console.log(result);
                },
                onError: function (result) {
                    //console.error(result);
                },
            });

            get('/ajax', {get: 1}, function (err, result) {
                //console.log(err, result);
            });

            del('/ajax', {del: 1}, function (err, result) {
                //console.log(err, result);
            });

            put('/ajax?put=1', {name: 1, show: { age: 1, go: 2}}, function (err, result) {
                //console.log(err, result);
            });

            post('/ajax?post=1', {name: '余伟', show: { age: 1, go: 2}}, function (err, result) {
                //console.log(err, result);
            });
        }
    }
</script>
