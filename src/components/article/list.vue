<template>
    
    <section class="middle-mode wue-article-section" v-if="video || images && images.length < 3">
        <a class="article-link clearfix">
            <div class="article-item-detail">
                <h3 class="article-title image-margin-right">印度的大阅兵，阅兵不都是严肃的吗？但是我为什么觉得特别有喜感</h3>
                <div class="other-item-info">
                    <slot>
                        <span class="hot">热</span>
                        <span class="author">很懂武器的小哥</span>
                        <span >评论</span>
                        <span class="comment">415</span>
                    </slot>
                </div>
            </div>
            <div class="article-image">
                <img src="http://p3.pstatp.com/video1609/31b90002786a93d3ca73">
                <span class="video-btn" v-if="video"></span>
            </div>
        </a>
    </section>

    <section class="wue-article-section" v-else>
        <a class="article-link clearfix">
            <div class="article-item-detail">
                <h3 class="article-title" v-text="title"></h3>
                <div class="article-image-list">
                    <ul class="clearfix">
                        <li class="list-img-holder" v-for="img in showImages"><img :src="img"></li>
                    </ul>
                </div>
                <div class="other-item-info">
                    <slot>
                        <span class="hot">热</span>
                        <span class="author">很懂武器的小哥</span>
                        <span >评论</span>
                        <span class="comment">415</span>
                    </slot>
                </div>
            </div>
        </a>
    </section>
</template>

<script>
    export default {
        name: 'wue-article-list',

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
            }
        },

        data(){
            return {
                showImages: this.images ? this.images.slice(0, 3) : []
            };
        },

        computed: {},

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
                                display: block;
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
                        }
                    }
                }
            }
        }

        &.middle-mode{
            
            .article-link{

                display: block;
                height: 100%;
                width: 100%;
                
                .article-item-detail{
                    display: inline-block;
                    width: 60%;
                    vertical-align: middle;
                }
                
                .article-image{
                    overflow: hidden;
                    width: 33%;
                    display: inline-block;
                    vertical-align: middle;
                    height: 100%;
                    background-color: #eee;
                    margin-top: 0.5rem;
                    
                    img{
                        border: none;
                        display: block;
                        width: 100%;
                        height: 100%;
                        .transition(opacity .3s ease);
                    }
                }
                
            }
        }
    }
</style>