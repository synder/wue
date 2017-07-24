<template>
    <div>
        <wue-upload url="/upload" :width="100" :height="60" :on-progress="progress" :removable="true"></wue-upload>
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
            progress(){
                
            }
        }
    }
</script>
