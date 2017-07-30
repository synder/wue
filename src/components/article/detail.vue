<template>
    <article class="weui-article">
        <div class="article-header">
            <h1 class="article-title">邓紫棋终于脱离皮裤了，这样的她是不是更可爱呢？</h1>
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
    @import '../../styles/widget/weui-page/weui-article.less';
    
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