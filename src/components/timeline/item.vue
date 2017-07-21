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

