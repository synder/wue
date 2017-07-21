<template>
    <div>
        <div class="accordion-title" @click="toggle">
            <span v-if="$slots.title">
                <slot name="title"></slot>
            </span>
            <span v-else>{{title}}</span>
            <i :class="show ? 'accordion-rotated' : ''"></i>
        </div>
        <div class="accordion-content" :style="{height: height}">
            <div ref="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>

    @line-color: #D9D9D9;

    .bottom-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid @color;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }

    .accordion-title {
        min-height: 1rem;
        display: flex;
        align-items: center;
        position: relative;
        user-select: none;
        padding: 0.8rem;
        overflow: hidden;
        &:after {
            .bottom-line(@line-color);
        }
        > span {
            display: block;
            flex: 1;
            font-size: 1rem;
            color: #444;
        }
        > i {
            overflow: hidden;
            &:after {
                content: '';
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #A0A0A0;
                display: block;
                transition: transform .25s cubic-bezier(0.4, 0.6, 0.2, 1);
                transform: rotate(0deg);
            }
            &.accordion-rotated:after {
                transform: rotate(-180deg);
            }
        }
    }

    .accordion-content {
        position: relative;
        overflow: hidden;
        transition: height .25s cubic-bezier(0.4, 0.6, 0.2, 1);
        &:after {
            .bottom-line(@line-color);
        }
    }
    
</style>

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
            title: String,
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
                this.height = (this.show ? this.$refs.content.offsetHeight : 0) + 'px';
            }
        },
        mounted() {
            this.setHeight();
        }
    }
</script>
