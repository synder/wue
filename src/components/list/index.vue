<template>
    <div class="wue-list" :class="classes">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'wue-list',
        props: {
            theme: {
                validator(value){
                    return ['1', '2', '3', '4'].indexOf(value + '') > -1;
                },
                default: '1'
            }
        },
        computed: {
            classes() {
                return 'wue-list-theme-' + this.theme;
            }
        }
    }
</script>

<style lang="less" scoped>

    @import "../../styles/base/reset.less";

    @line-color: #D9D9D9;

    .text-overflow(@align: justify) {
        word-wrap: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: @align;
    }
    
    .text-overflow(@align: justify) {
        word-wrap: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: @align;
    }

    .top-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 0.1rem solid @color;
        .scaleY(.5);
        .transform-origin(0 0);
    }

    .bottom-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 0.1rem solid @color;
        .scaleY(.5);
        .transform-origin(0 0);
    }

    .left-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        top: 0;
        left: 0;
        height: 100%;
        border-left:0.1rem solid @color;
        .scaleX(.5);
        .transform-origin(0 0);
    }

    .right-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        top: 0;
        right: 0;
        height: 100%;
        border-right: 0.1rem solid @color;
        .scaleX(.5);
        .transform-origin(0 0);
    }


    .line-clamp(@line: 2, @line-height: .38rem) {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: @line;
        -webkit-box-orient: vertical;
        word-break: break-all;
        text-overflow: ellipsis;
        line-height: @line-height;
        max-height: @line-height * @line + .2rem;
    }



    .wue-list {
  
        position: relative;
        .box-sizing(border-box);
        
        .wue-list-item:active {
            background: none;
        }

        .wue-list-item{
            display: block;
            .box-sizing(border-box);
            .border-radius(0.1rem);
        }
    }

    .wue-list-theme-1 {
        padding: 0 2px 0;
        
        .wue-list-item {
            width: 50%;
            padding: 0 0.2rem;
            margin: 0.2rem 0;
            float: left;
            .border-radius(1rem);
            
            .wue-list-mes {
                padding: .3rem;
                
                .wue-list-title {
                    .text-overflow();
                    height: 1.5rem;
                }
            }
        }
    }

    .wue-list-theme-2 {
        .wue-list-item {
            width: 50%;
            float: left;
            padding: .2rem;
            position: relative;
            z-index: 0;
            background-color: #FFF;
            &:before {
                .bottom-line(@line-color);
            }
            &:nth-child(odd):after {
                .right-line(@line-color);
            }
            .wue-list-mes {
                padding-top: .1rem;
                .wue-list-title {
                    .text-overflow();
                    height: 1.5rem;
                }
            }
            &:active {
                background: #FFF; /* for old android */
            }
        }
    }

    .wue-list-theme-3 {
        padding: 0 7px;
        background-color: #FFF;
        .wue-list-item {
            overflow: hidden;
            .display-flex();
            padding: 7px 0 8px 0;
            position: relative;
            &:not(:last-child):after {
                .bottom-line(@line-color);
            }
            .wue-list-img {
                width: 2rem;
                padding: 1rem 0;
            }
            .wue-list-mes {
                .flex(1);
                padding-left: 7px;
                .wue-list-title {
                    .line-clamp(3, .38rem);
                }
                .wue-list-other {
                    padding-top: .1rem;
                }
            }
        }
    }

    .wue-list-theme-4 {
        background-color: #FFF;
        .wue-list-item {
            display: block;
            position: relative;
            z-index: 1;
            padding: .2rem .2rem 0 .2rem;
            &:after {
                .bottom-line(@line-color);
            }
            .wue-list-mes {
                padding: .2rem 0 .15rem;
                .wue-list-other {
                    padding-top: .06rem;
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        .wue-list-theme-1 {
            padding: 0 4px;
            .wue-list-item {
                padding: 0 4px;
                margin-top: 8px;
            }
        }

        .wue-list-theme-4 {
            padding: 0 9px;
            .wue-list-item {
                padding: 9px 0 10px 0;
                .wue-wue-list-mes {
                    padding-left: 9px;
                }
            }
        }
    }
   
</style>
