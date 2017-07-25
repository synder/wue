<template>
    <li class="wue-timeline-item">
        <div :class="['wue-timeline-item-color', {'wue-timeline-item-head': !isFirst,'wue-timeline-item-head-first': isFirst }]"
             :style="headStyle">
            <icon v-show="isFirst && $parent.isShowIcon" type="success_no_circle"
                  class="wue-timeline-item-checked"></icon>
        </div>
        <div class="wue-timeline-item-tail" :style="tailStyle"></div>
        <div class="wue-timeline-item-content">
            <slot></slot>
        </div>
    </li>
</template>

<style lang="less" scoped>
    @import "../../styles/base/reset.less";

    @timeline-item-bg-color: #04BE02;

    .wue-timeline > ul > li {
        list-style: none;
    }

    .wue-timeline {
        &-item {
            position: relative;
        }

        &-item-content {
            padding: 0 0 1.5rem 1.2rem;
        }

        &-item-head, &-item-head-first {
            position: absolute;
            content: '';
            z-index: 99;
            .border-radius(99px);
        }

        &-item-head {
            width: 10px;
            height: 10px;
            left: 1px;
            top: 4px;
        }

        &-item-head-first {
            width: 20px;
            height: 20px;
            left: -4px;
            top: 5px;
        }

        &-item-tail {
            position: absolute;
            content: '';
            height: 100%;
            width: 2px;
            left: 5px;
            top: 5px;
            background-color: @timeline-item-bg-color;
        }

        &-item-checked {
            position: absolute;
            left: 0;
            top: 0;
            width: 20px;
            height: 20px;

            &.weui-icon-success-no-circle::before {
                font-size: 14px;
                position: absolute;
                left: 3px;
                top: 3px;
                margin: 0 !important;
                color: #FFF;
            }
        }
    }

    .wue-timeline-item-color {
        background-color: @timeline-item-bg-color;
    }
</style>

<script>
    import Icon from '../icon/index.vue';

    export default {
        name: 'wue-timeline-item',
        data () {
            return {
                isLast: true,
                isFirst: true,
                headStyle: {backgroundColor: this.$parent.color}
            }
        },
        mounted () {
            this.$parent.setChildProps()
        },
        beforeDestroy () {
            // this will be null
            const $parent = this.$parent
            this.$nextTick(() => {
                $parent.setChildProps()
            })
        },
        components: {
            Icon
        },
        computed: {
            tailStyle () {
                return this.isLast ? {display: 'none', backgroundColor: this.$parent.color} : {
                    display: 'block',
                    backgroundColor: this.$parent.color
                }
            }
        }
    }
</script>

