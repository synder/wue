<template>
    
    <section class="middle-mode wue-article-section" v-if="video || images && images.length < 3">
        <a class="article-link clearfix" :href="link || 'javascript: void(0)'">
            <div class="article-item-detail" :style="style">
                <h3 class="article-title image-margin-right">印度的大阅兵，阅兵不都是严肃的吗？但是我为什么觉得特别有喜感</h3>
                <div class="other-item-info">
                    <slot>
                        <span class="hot" v-if="hot">热</span>
                        <span class="author" v-text="author"></span>
                        <span v-if="comment != null">评论</span>
                        <span class="comment" v-text="comment"></span>
                    </slot>
                </div>
            </div>
            <div class="article-image" v-if="images && images.length > 0">
                <wue-lazy-image :src="images[0]"></wue-lazy-image>
                <span class="video-btn" v-if="video"></span>
            </div>
        </a>
    </section>

    <section class="wue-article-section" v-else>
        <a class="article-link clearfix" :href="link || 'javascript: void(0)'">
            <div class="article-item-detail">
                <h3 class="article-title" v-text="title"></h3>
                <div class="article-image-list">
                    <ul class="clearfix">
                        <li class="list-img-holder" v-for="img in showImages">
                            <wue-lazy-image :src="img"></wue-lazy-image>
                        </li>
                    </ul>
                </div>
                <div class="other-item-info">
                    <slot>
                        <span class="hot" v-if="hot">热</span>
                        <span class="author" v-text="author"></span>
                        <span v-if="comment != null">评论</span>
                        <span class="comment" v-text="comment"></span>
                    </slot>
                </div>
            </div>
        </a>
    </section>
</template>

<script>
    import WueLazyImage from "../lazyload/index";
    
    export default {
        name: 'wue-article-list',

        components: {
            WueLazyImage,
        },

        props: {
            title: {
                type: String,
                required: false
            },

            summary: {
                type: String,
                required: false
            },

            link: {
                type: String,
                required: false
            },

            video: {
                type: Boolean,
                default: false
            },

            images: {
                type: Array
            },

            hot: Boolean,
            author: String,
            comment: {
                type: Number,
                default: 0
            }
        },

        data(){
            return {
                showImages: this.images ? this.images.slice(0, 3) : []
            };
        },

        computed: {
            style(){
                let temp = {};
                if(!(this.images && this.images.length > 0)){
                    temp.width = '100%';
                }
                return temp;
            }
        },

        methods: {},

        watch: {},

        mounted(){

        }
    }
</script>

<style lang='less' scoped>

    @import "../../styles/base/reset.less";

    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }

    .wue-article-section {
        margin: 0 0.5rem;
        position: relative;
        -webkit-transition: all 1s ease-in-out;
        border-bottom: 0.01rem solid hsla(0, 0%, 87%, .6);
        padding: 0;
        font-family: STHeiti, Microsoft YaHei, Helvetica, Arial, sans-serif;
        word-break: break-all;

        .article-link {
            
            display: block;
            height: 100%;
            width: 100%;

            .article-item-detail {
                height: 100%;
                width: 100%;

                h3 {
                    line-height: 1.3rem;
                    font-size: 1.1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .display-flex();
                    -webkit-box-orient: vertical;
                    color: #222;
                    -webkit-margin-before: 0.8em;
                    -webkit-margin-after: 0.3em;
                    -webkit-margin-start: 0;
                    -webkit-margin-end: 0;
                    font-weight: normal;
                }

                .article-image-list {
                    margin-top: 0.2rem;

                    ul {
                        display: block;
                        margin: 0;
                        padding: 0;
                        list-style-type: none;
                        text-align: center;
                        -webkit-margin-before: 0.1em;
                        -webkit-margin-after: 0.3em;
                        -webkit-margin-start: 0;
                        -webkit-margin-end: 0;

                        li {
                            display: inline-block;
                            overflow: hidden;
                            width: 33.3%;
                            box-sizing: border-box;
                            height: 5rem;
                            position: relative;
                            float: left;

                            &:first-child {
                                padding-right: 0.1rem;
                            }

                            &:last-child {
                                padding-left: 0.1rem;
                            }

                            img {
                                border: none;
                                width: 100%;
                                .transition(opacity .3s ease);
                            }
                        }
                    }

                }
                
                .other-item-info{
                    color: #999;
                    overflow: hidden;
                    font-size: 0.8rem;
                    line-height: 1.5rem;
                    
                    
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        
                        &.comment{
                            padding-top: 0.1rem;
                        }
                        
                        &.hot{
                            color: #FF4200;
                            border: 0.01rem solid  #FF4200;
                            .border-radius(0.2rem);
                            height: 0.8rem;
                            width: 0.8rem;
                            text-align: center;
                            line-height: 0.9rem;
                            font-size: 0.7rem;
                            margin-bottom: 0.1rem;
                        }
                    }
                }
            }
        }

        &.middle-mode{
            
            .article-link{

                .display-flex;
                height: 100%;
                width: 100%;
                
                .article-item-detail{
                    display: inline-block;
                    width: 67%;
                    vertical-align: middle;
                }
                
                .article-image{
                    overflow: hidden;
                    width: 33%;
                    .display-flex();
                    .flex-align-items(center);
                    box-orient: vertical;
                    box-pack: center;
                    background-color: #eee;
                    height: 5.2rem;
                    margin-top: 0.8rem;
                    
                    img{
                        border: none;
                        width: 100%;
                        .transition(opacity .3s ease);
                    }
                    
                    &:after{
                        content:'';
                        height:100%;
                    }
                }
                
            }
        }
    }
</style>