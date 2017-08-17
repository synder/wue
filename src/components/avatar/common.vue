<template>
    <a :herf="to" class="avatar" :style="style">
        <span class="add">
            <i class="weui-icon-venus"></i>
        </span>
    </a>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset";
    @import "../../styles/icon/weui-icon";
    
    a.avatar {
        display: inline-block;
        border: none;
        background: no-repeat center;
        background-size: 100%;
        position: relative;
        
        .add{
            display: block;
            position: relative;
            bottom: -7px;
            right: -10px;
            color: #FF3B30;
        }
    }
    
</style>

<script>
    export default {
        name: 'wue-common-avatar',

        props: {
            to: String,
            src: String,
            width: {
                type: Number,
                default: 34,
            },
            height: {
                type: Number,
                default: 34,
            },
            radius: {
                type: Number,
                default: function(){
                    return this.width / 2;
                }
            }
        },

        data(){
            return {};
        },

        computed: {
            style(){
                return {
                    width: this.width + 'px',
                    height: this.height + 'px',
                    borderRadius: this.radius + 'px',
                    lineHeight: this.height + 'px',
                    backgroundImage: 'url(' + this.src + ')'
                }
            }
        },
    }
</script>