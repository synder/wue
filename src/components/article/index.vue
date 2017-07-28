<template>
    <article class="weui-article">
        <h1 v-html="title"></h1>
        <section>
            <slot></slot>
        </section>
    </article>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-page/weui-article.less';
</style>

<script>
    export default {
        name: 'wue-article',
        props: {
            title: String | Number
        }
    }
</script>