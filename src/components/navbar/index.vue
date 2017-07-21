<template>
    <div class="wue-navbar" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-navbar',

        props: {
            fixed: Boolean,
            color: {
                type: String,
                default: '#333'
            },
            backgroundColor: {
                type: String,
                default: '#FAFAFA'
            },
            activeColor: {
                type: String,
                default: '#09BB07'
            },
            disabledColor: {
                type: String,
                default: '#cfcfcf'
            },
            lineWidth: {
                type: Number,
                default: 3
            },
            value: {}
        },

        computed: {
            style () {
                return {
                    position: this.fixed ? 'fixed' : 'absolute',
                    backgroundColor: this.backgroundColor
                }
            }
        },

        watch: {
            value (newValue) {
                this.$emit('change', newValue)
            }
        }
    }
</script>

<style scoped lang="less">
    .wue-navbar {
        display: flex;
        width: 100%;
        z-index: 5000;
        background-color: #fff;
    }
</style>
