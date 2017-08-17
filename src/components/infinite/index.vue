<template>
    <div>
        <slot></slot>

        <div class="wue-infinite-list-done-tip" v-show="!isLoading && isDone">
            <slot name="doneTip">没有更多数据了</slot>
        </div>

        <div class="wue-infinite-list-loading" v-show="isLoading">
            <wue-spinner></wue-spinner>
        </div>

        <div ref="tag" class="wue-infinite-list-tag"></div>
    </div>
</template>

<script type="text/babel">

    import WueSpinner from '../spinner/index.vue';

    export default {

        name: 'wue-infinite-scroll',

        components: {
            WueSpinner
        },

        data() {
            return {
                isLoading: false,
                isDone: false,
                num: 1
            }
        },

        props: {
            onInfinite: {
                type: Function,
                required: true
            },
            distance: {
                default: 0,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            }
        },

        methods: {
            init() {
                const self = this;

                self.scrollview = window;

                self.scrollview.addEventListener('scroll', self.throttledCheck, false);

                self.$on('over', () => {
                    self.over();
                });

                self.$on('finished', () => {
                    self.finished();
                });

                self.$on('loading', () => {
                    self.loading();
                });

                self.$on('resize', () => {
                    self.resize();
                });
            },

            over(){
                this.isLoading = false;
                this.isDone = true;
            },

            finished(){
                this.isLoading = false;
            },

            loading(){
                this.isLoading = true;
            },
            reset(){
                this.isLoading = false;
                this.isDone = false;
                this.num = 1;
            },

            scrollHandler() {

                if (this.isLoading) {
                    return;
                }

                if (this.isDone) {
                    return;
                }

                const scrollView = this.scrollview;
                const contentHeight = document.body.offsetHeight;
                const offsetTop = scrollView === window ? 0 : scrollView.getBoundingClientRect().top;

                if (!scrollView) {
                    return;
                }

                let tag = this.$refs.tag;

                const tagOffsetTop = Math.floor(tag.getBoundingClientRect().top) - 1;
                const distance = !!this.distance && this.distance > 0 ? ~~this.distance : Math.floor(contentHeight / 10);

                if (tagOffsetTop > offsetTop && tagOffsetTop - (distance + offsetTop) * this.num <= contentHeight) {
                    this.isLoading = true;
                    this.onInfinite();
                    this.num++;
                }
            },
            throttle(method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(() => {
                    method.call(context);
                }, 50);
            },
            throttledCheck() {
                this.throttle(this.scrollHandler);
            }
        },

        mounted() {
            this.$nextTick(this.init);
        },

        destroyed() {
            this.scrollview.removeEventListener('scroll', this.throttledCheck);
        }
    }
</script>

<style lang="less" scoped>

    @import "../../styles/base/reset.less";

    .wue-infinite-list-loading {
        margin-top: 0.8rem;
        margin-bottom: 0.8rem;
        text-align: center;
        font-size: 2rem;
        color: #999;
        height: 2rem;
        clear: both;
        line-height: 2rem;
        width: 100%;

    img {
        height: inherit;
        display: inline-block;
    }

    }

    .wue-infinite-list-done-tip {
        font-size: 0.9rem;
        text-align: center;
        padding: 0.6rem 0;
        color: #777;
        clear: both;
        width: 100%;
    }

    .wue-infinite-list-tag {
        height: 1px;
        width: 100%;
        clear: both;
    }

</style>
