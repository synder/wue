<template>
    <div class="ribbon">
        <div class="wrap">
            <span class="ribbon-co" v-html="text" :style="style"></span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'wue-ribbon',

        props: {
            text: {
                type: String
            },
            
            type: {
                type: String,
                default : 'top'
            },
            color: {
                type: String,
                default: 'red'
            },

            height: {
                type: Number,
                default: 30
            },
        },
        
        computed: {
            style(){
                
                let temp = { 
                    background: this.color,
                    boxShadow: '0 0 0 3px ' + this.color,
                    height: this.height + 'px',
                    lineHeight: this.height + 'px',
                };
                
                return temp;
            }
        },

        data(){
            return {};
        },
    }
</script>


<style lang='less' scoped>
    @import "../../styles/base/reset.less";
    
    .ribbon {
        padding: 0;
        margin: 0;
        display: inline-block;
        width: 100%;
        position: relative;
        background-size: cover;
        text-transform: uppercase;
        z-index: 1;
        .box-sizing('border-box');

        .wrap {
            width: 100%;
            min-height: 150px;
            position: absolute;
            overflow: hidden;
            color: white;

            .ribbon-co {
                display: inline-block;
                text-align: center;
                width: 200px;
                position: absolute;
                top: 30px;
                right: -50px;
                z-index: 2;
                border: 1px dashed;
                overflow: hidden;
                .rotate(45deg);
            }
        }

    }
</style>
