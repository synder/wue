<template>
    <div>
        <div class="accordion-title" @click="toggle">
            <slot name="title">
                <span>{{title}}</span>
            </slot>
            
            <i :class="show ? 'accordion-rotated' : ''"></i>
        </div>
        <div class="accordion-content" :style="{height: height}">
            <div ref="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'wue-accordion-item',
        data() {
            return {
                show: this.open,
                height: 0
            }
        },
        props: {
            title: String | Number,
            open: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            open(val) {
                this.show = val;
                this.setHeight();
            }
        },
        methods: {
            toggle() {
                this.$parent.open(this._uid);
                this.setHeight();
            },
            setHeight() {
                const content =  this.$refs.content;
                this.height = (this.show ? content.offsetHeight : 0) + 'px';
            }
        },
        mounted() {
            this.setHeight();
        }
    }
</script>


<style lang="less" scoped>
    @import "../../styles/base/reset";
    @import "../../styles/widget/accordion/item";
</style>