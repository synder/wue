<template>
   <wue-article-list :images="images" :title="title"></wue-article-list>
</template>

<script>
    import WueTimeline from '../../../src/components/timeline/index.vue';
    import WueTimelineItem from '../../../src/components/timeline/item.vue';
    import WueBacktop from "../../../src/components/backtop/index";
    import WueArticleList from "../../../src/components/article/list";

    export default {
        components: {
            WueArticleList,
            WueBacktop,
            WueTimeline,
            WueTimelineItem,
        },
        data () {
            return {
                value: null,
                title: '张艺谋显赫家世曝光，千万豪宅六辆豪车，但和冯小刚比还是太寒酸！',
                images: [
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
