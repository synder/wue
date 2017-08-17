<template>
    <div class="form-preview">
        <div class="form-preview__hd">
            <label class="form-preview__label" v-html="title"></label>
            <em class="form-preview__value" v-html="value"></em>
        </div>
        <div class="form-preview__bd">
            <div class="form-preview__item" v-for="item in dataItems" :key="item">
                <label class="form-preview__label">{{ item.label }}</label>
                <span class="form-preview__value">{{ item.value }}</span>
            </div>
        </div>
        <div class="form-preview__ft">
            <a class="form-preview__btn"
               :class="item.type === 'primary' ? 'form-preview__btn_primary' : 'form-preview__btn_default'"
               href="javascript:" v-text="item.text" @click="item.action" v-for="item in buttons" :key="item"></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-preview',

        props: {
            title: String | Number,
            value: String,
            dataItems: {
                type: Array,
                default: () => []
            },
            buttons: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/base/reset.less";
    @import '../../styles/widget/cell/form/form-preview.less';
</style>
