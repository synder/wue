<template>
    <a :href="to" class="media-box media-box_appmsg">
        <div class="media-box__hd" v-if="thumb">
            <slot name="thumb">
                <img class="media-box__thumb" :src="thumb" :alt="alt" >
            </slot>
        </div>
        <div class="media-box__bd">
            <h4 class="media-box__title" v-html="title"></h4>
            <p class="media-box__desc" v-html="summary"></p>
        </div>
    </a>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset";
    @import "../../styles/widget/media-box/media-box";
</style>

<script>
    export default {
        name: 'wue-article-list',

        props: {
            to: String,
            thumb: String,
            alt: String,
            title: {
                type: String,
                required: true,
            },
            summary: {
                type: String,
                required: true,
            }
        },

        data(){
            return {};
        },
    }
</script>