<template>
    <div>
        <wue-article-list-item :images="images1" :title="title" link="http://www.baidu.com"></wue-article-list-item>
        <wue-article-list-item :images="images2" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
        <wue-article-list-item :images="images" :title="title"></wue-article-list-item>
    </div>
</template>

<script>
    import WueArticleListItem from "../../../src/components/article/item.vue";

    export default {
        components: {
            WueArticleListItem,
        },
        data () {
            return {
                value: null,
                title: '张艺谋显赫家世曝光，千万豪宅六辆豪车，但和冯小刚比还是太寒酸！',
                images1: [

                ],

                images2: [
                    'https://p3.pstatp.com/list/31d40002062af65dd383'
                ],

                images: [
                    'https://p3.pstatp.com/list/31d600014dce7c04cf4c',
                    'https://p3.pstatp.com/list/31d600014dce7c04cf4c',
                    'https://p3.pstatp.com/list/31d40002062af65dd383'
                ]
            }
        },

        methods: {
            next(){
                this.value = 'a3';
            }
        }
    }
</script>