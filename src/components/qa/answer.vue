<template>
    <div>
        <div class="header">
            <wue-common-avatar src="http://upload.jianshu.io/users/upload_avatars/7355075/bfe84d4d-c726-49df-81f7-1eec1164fafc?imageMogr2/auto-orient/strip|imageView2/1/w/102/h/102"></wue-common-avatar>
            <a class="username">我叫什么</a>
            <a class="favour">
                <i class="weui-icon-favour"></i>122
            </a>
            <a class="comment">
                <i class="weui-icon-bubble"></i>133
            </a>
        </div>
        
        <div class="clearfix"></div>

        <div class="content">
            <p ref="contents" :style="style">真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！</p>
            <wue-divider @click="expand" v-show="style" class="expand">
                展开
            </wue-divider>
            <div class="meta">
                <span>两天前</span>
                <span>10:00</span>
            </div>
        </div>
        
        <div class="comments">
            <div class="comments-item">
                <a class="username">我叫什么</a> : <a class="at-username">@sam</a>
                <span>真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！</span>
                <div class="meta">
                    <span>两天前</span>
                    <span>10:00</span>
                    <span>
                        <a>回复</a>
                    </span>
                </div>
            </div>

            <div class="comments-item">
                <a class="username">我叫什么</a> : <a class="at-username">@sam</a>
                <span>真的，看多了那些，时间错综的关系复杂的小说之后，反而更喜欢这种贴近生活的。非常流畅，忍不住想要看下去！！赞赞！！</span>
                <div class="meta">
                    <span>两天前</span>
                    <span>10:00</span>
                    <span>
                        <a>回复</a>
                    </span>
                </div>
            </div>
           
            <div class="more-comments">
                <a>更多13条回复</a>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset";
    @import "../../styles/mixin/float";
    @import "../../styles/mixin/text";
    @import "../../../vue/styles/mixin/gradient";
    @import "../../styles/icon/weui-icon";
    
    @avatar-height: 34px;
    @line-height: @avatar-height;
    @padding-right: 0.8rem;
    @padding-left: @padding-right;
    @username-margin: @padding-left;
    
    .header{
        vertical-align: middle;
        line-height: @line-height;
        padding: 0 @padding-right 0 @padding-left;
        
        a{
            display: inline-block;
            float: left;
            line-height: @line-height;
            
            &.username{
                margin-left: @username-margin;
            }

            &.comment{
                margin-right: @padding-left + @username-margin;
            }
            
            &.favour, &.comment{
                float: right;
                color: #B2B2B2;
                
                i{
                    margin-bottom: 3px;
                }
                
                &.active{
                    color: #FF3B30;
                }
            }
        }
    }
    
    a.username, a.at-username{
        color: #FF3B30;
    }
    
    .clearfix{
        .clearfix();
    }
    
    .content{
        padding-top: 0.5rem;
        padding-left: @padding-left;
        padding-right: @padding-right;
        text-align: justify;
        
        .expand{
            color: #FF3B30;
        }
    }
    
    .comments{
        padding-left: @padding-left;
        padding-right: @padding-left;
        font-size: 1rem;
        .wrap-words();
        text-align: justify;
    }

    .meta {
        font-size: 0.8rem;
        color: #aaa;
        margin-top: 0.2rem;
    }
    
    .comments{
        padding-top: 0.5rem;
        
        .comments-item{
            width: 100%;
            font-size: 0.9rem;
            padding: 0.5rem 0;
            position: relative;
          
            &:before{
                width: 100%;
                .setTopLine();
            }

        }
        
        .more-comments{
            line-height: 2.5rem;
            color: #FF3B30;
            position: relative;
            
            &:before{
                width: 100%;
                .setTopLine();
            }
            
           
        }
        
    }
</style>

<script>
    import WueCommonAvatar from "../avatar/common";
    import WueDivider from "../divider/index";
    export default {
        components: {
            WueDivider,
            WueCommonAvatar,
        },
        name: 'wue-qa-answer',

        props: {},

        data(){
            return {
                height: 0,
            };
        },

        computed: {
            style(){
                if(this.height > 150){
                    return {
                        height: 150 + 'px',
                        overflow: 'hidden'
                    }
                }else{
                    return null;
                }
            }
        },

        methods: {
            expand(){
                this.height = 0;
            }
        },

        watch: {},

        mounted(){
            const contents = this.$refs.contents;
            this.height = contents.offsetHeight;
        }
    }
</script>