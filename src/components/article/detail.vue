<template>
    <article class="article">
        <div class="article-header">
            <h1 class="article-title" v-html="title"></h1>
            <div class="article-author">
                <slot></slot>
            </div>
        </div>
        <div class="article-content" v-html="content">
            <slot name="content"></slot>
        </div>
    </article>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/page/article.less';
    
    .article-content{
        height: auto;
    }
</style>

<script>
    export default {
        name: 'wue-article-detail',
        props: {
            title: String,
            content: String
        }
    }
</script>