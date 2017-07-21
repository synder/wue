<template>
    <div class="wue-marquee-item">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'wue-marquee-item',
        mounted() {
            this.$parent.init();
        }
    }
</script>
