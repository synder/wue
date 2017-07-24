<template>
    <div class="wue-accordion">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'wue-accordion',
        props: {
            accordion: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            open(uid) {
                this.$children.forEach(item => {
                    if (item._uid === uid) {
                        item.show = !item.show;
                    } else {
                        if (!this.accordion) {
                            item.show = false;
                            item.height = 0;
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .wue-accordion {
        background-color: #fff;
    }
</style>
