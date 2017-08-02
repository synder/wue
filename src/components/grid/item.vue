<template>
    <a :href="to" class="weui-grid" @click="onClick" :style="style" v-else>
        <div class="weui-grid__icon" v-if="hasIconSlot || icon">
            <slot name="icon">
                <img :src="icon" alt="">
            </slot>
        </div>
        <p v-if="hasLabelSlot || label" class="weui-grid__label">
            <slot name="label">
                <span v-html="label"></span>
            </slot>
        </p>
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: 'wue-grid-item',
        props: {
            icon: String,
            label: String | Number,
            to: String,
        },
        mounted () {
            this.$slots.icon && (this.hasIconSlot = true);
            this.$slots.label && (this.hasLabelSlot = true);
        },
        computed: {
            style () {
                const rows = this.$parent.rows;
                
                if (!rows || rows === 3) {
                    return;
                }
                const styles = {};
                styles.width = `${100 / rows}%`;
                return styles;
            }
        },
        methods: {
            onClick (e) {
                if(!this.to){
                    e.preventDefault();
                }
                this.$emit('click');
            }
        },
        data () {
            return {
                hasIconSlot: false,
                hasLabelSlot: false
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-grid/weui-grid.less';
</style>
