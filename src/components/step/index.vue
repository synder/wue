<template>
    <div class="wue-step">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-step',
        props: {
            value: Number,
            gutter: {
                type: Number,
                default: 10
            }
        },
        created () {
            this.current = this.value
        },
        mounted () {
            this._mapPropsToChildComponent();
        },
        watch: {
            value (val) {
                this.current = val;
            },
            current (val) {
                this._mapPropsToChildComponent();
                this.$emit('input', val);
            }
        },
        data () {
            return {
                current: 0
            }
        },
        methods: {
            _mapPropsToChildComponent () {
                const _this = this;
                const len = this.$children.length - 1;
                this.$children.forEach((child, index) => {
                    child.currentStepNumber = (index + 1).toString();
                    child.currentStepLast = index === len;

                    if (index === _this.current) {
                        child.currentStatus = 'process';
                    } else if (index < _this.current) {
                        child.currentStatus = 'finish';
                    } else {
                        child.currentStatus = 'wait';
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    @import "../../styles/base/reset.less";
    
    .wue-step {
        .flex-box();
    }
</style>
