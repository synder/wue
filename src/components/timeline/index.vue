<template>
    <div class="wue-timeline">
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'wue-timeline',
        props: {
            color: String,
            isShowIcon: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            setChildProps () {
                if (!this.$children) return
                const len = this.$children.length
                this.$children.forEach((child, index) => {
                    child.isLast = index === len - 1
                    child.isFirst = index === 0
                })
            }
        }
    }
</script>

<style lang="less">
    
    @import "../../styles/base/reset.less";

    .wue-timeline {
        padding: 1rem;
    }
</style>
