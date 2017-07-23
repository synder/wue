<template>
    <div>
        <wue-upload url="/upload"></wue-upload>
    </div>
</template>

<script type="text/babel">


    import upload from '../../../src/components/upload/index.vue';
    import WueUpload from "../../../src/components/upload/index";

    export default {
        components: {
            WueUpload,
            'wue-upload': upload
        },
        
        data() {
            return {}
        },
        
        methods: {
            
        }
    }
</script>
