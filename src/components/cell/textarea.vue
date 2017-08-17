<template>
    <div class="cell">
        <div class="cell__bd">
      <textarea @change="$emit('change', currentValue)"
                class="textarea"
                :placeholder="placeholder"
                :rows="rows"
                :disabled="disabled"
                :readonly="readonly"
                v-model="currentValue"></textarea>
            <div class="textarea-counter" v-if="max"><span>{{ length }}</span>/{{ max }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-textarea',

        props: {
            value: String | Number,
            placeholder: String | Number,
            rows: {
                type: Number,
                default: 3
            },
            max: {
                type: Number,
            },
            disabled: Boolean,
            readonly: Boolean,
        },

        data () {
            return {
                currentValue: this.value
            }
        },

        computed: {
            length () {
                return this.currentValue ? this.currentValue.length : 0;
            }
        },

        mounted () {
            this.currentValue = this.value;
        },

        watch: {
            currentValue (val) {
                this.$emit('input', val);
            },

            value (val) {
                // 有最大字数限制时对超出限制部分进行截取
                if (this.max && this.value.length > this.max) {
                    val = val.slice(0, this.max);
                }

                this.currentValue = val;
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/cell/cell-global.less';
    @import '../../styles/widget/cell/form/form_common.less';
</style>
