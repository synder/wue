<template>
   <div>
      <wue-article-detail></wue-article-detail>
   </div>
</template>

<script>
    import WueArticleListItem from "../../../src/components/article/item.vue";
    import WueArticleDetail from "../../../src/components/article/detail";

    export default {
        components: {
            WueArticleDetail,
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
