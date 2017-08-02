<template>
    <div>
        <wue-infinite-scroll :on-infinite="loadList" ref="infinite">
            <wue-list theme="1">
                <wue-list-item v-for="item in list">

                    <img slot="img" :src="item.img">
                    <span slot="title">{{item.title}}</span>
                    <div>
                        <span class="wue-list-price"><em>¥</em>{{item.marketprice}}</span>
                        <span class="wue-list-del-price">¥{{item.productprice}}</span>
                    </div>
                </wue-list-item>
            </wue-list>

        </wue-infinite-scroll>

        <wue-backtop></wue-backtop>
    </div>
</template>

<script type="text/babel">


    import WueList from '../../../src/components/list/index.vue';
    import WueListItem from '../../../src/components/list/item.vue';
    import WueBacktop from '../../../src/components/backtop/index.vue';
    import WueInfiniteScroll from '../../../src/components/infinite/index.vue';

    export default {
        components: {
            WueList,
            WueListItem,
            WueBacktop,
            WueInfiniteScroll
        },

        data() {
            return {
                list: [
                    {
                        img: "http://img1.shikee.com/try/2016/06/23/14381920926024616259.jpg",
                        title: "标题标题标题标题标题",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg",
                        title: "骆驼男装2016夏装男士短袖T恤 圆领衣服 印花男装体恤 半袖打底衫",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/23/15395220917905380014.jpg",
                        title: "条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/25/14244120933639105658.jpg",
                        title: "夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/26/12365720933909085511.jpg",
                        title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg",
                        title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/03/12173920932544716516.jpg",
                        title: "superman短袖t恤日潮牌男士日韩夏装水洗做旧修身个性短袖t恤衣服",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/09/28/14575020926479478831.jpg",
                        title: "买一送二新款青少年潮男大码T恤 学生字半袖修身款衣服半截袖青年",
                        marketprice: 56.23,
                        productprice: 89.36
                    }
                ]
            }
        },
        methods: {
            loadList() {

                console.log(Date.now());

                const self = this;

                self.$refs.infinite.loading();

                setTimeout(function () {
                    self.list.push({
                        img: "http://img1.shikee.com/try/2016/09/28/14575020926479478831.jpg",
                        title: "买一送二新款青少年潮男大码T恤 学生字半袖修身款衣服半截袖青年",
                        marketprice: 56.23,
                        productprice: 89.36
                    });

                    self.$refs.infinite.finished();

                }, 5000);


            }
        }
    }
</script>