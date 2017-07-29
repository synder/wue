<template>
    <div>
        <div class="wue-mask-keyboard" v-if="triggerClose" v-show="show" @click.stop="close"></div>
        
        <div class="wue-mask-keyboard" v-else v-show="show"></div>
        
        <div class="wue-keyboard" :class="show ? 'keyboard-active' : ''">
            
            <div class="wue-keyboard-head">
                <strong>输入数字密码</strong>
            </div>
            
            <div class="wue-keyboard-error">{{error}}</div>
            
            <ul class="wue-keyboard-password">
                <li v-for="n in 6">
                    <i v-show="passwords.length >= n"></i>
                </li>
            </ul>
            
            <div class="wue-keyboard-content">
                <div class="wue-keyboard-title" v-if="title" v-html="title"></div>
                <ul class="wue-keyboard-numbers">
                    <li v-for="i in 4">
                        <template>
                            <a href="javascript:;" v-if="i == 4" @click.stop="close">取消</a>
                        </template>
                        <template>
                            <a href="javascript:;" v-for="n in numbers.slice((i - 1) * 3, i * 3)"
                               @touchstart.stop="numberClick(n)">{{n}}</a>
                        </template>
                        <a href="javascript:;" v-if="i == 4" @click.stop="backspace"></a>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>

<script type="text/babel">
    
    import {addClass, removeClass, getScrollView, pageScroll, isIOS} from '../../lib/dom/index.js';

    export default {
        name: 'yd-keyboard',
        data() {
            return {
                passwords: '',
                show: this.value,
                error: '',
                numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            }
        },
        props: {
            inputDone: {
                type: Function
            },
            disorder: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
            },
            triggerClose: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            value(val) {
                if (isIOS) {
                    if (val) {
                        pageScroll.lock();
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        pageScroll.unlock();
                        removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    }
                }

                this.passwords = '';
                this.error = '';
                this.show = val;

                if (this.show && this.disorder) {
                    this.numbers = this.upsetOrder(this.numbers);
                }
            },
            passwords(val) {
                if (val.length >= 6) {
                    this.inputDone && typeof this.inputDone === 'function' && this.inputDone(val);
                }
            }
        },
        methods: {
            init() {
                this.scrollView = getScrollView(this.$el);

                this.$on('error', (error) => {
                    this.setError(error);
                });

                this.$on('close', this.close);
            },
            numberClick(num) {
                this.error = '';
                if (this.passwords.length >= 6)return;
                this.passwords += num;
            },
            backspace() {
                const passwords = this.passwords;

                if (passwords) {
                    this.passwords = passwords.substr(0, passwords.length - 1);
                }
            },
            upsetOrder(arr) {
                const floor = Math.floor;
                const random = Math.random;
                const len = arr.length;

                let i, j, temp, n = floor(len / 2) + 1;

                while (n--) {
                    i = floor(random() * len);
                    j = floor(random() * len);
                    if (i !== j) {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
                return arr;
            },
            close() {
                isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                this.$emit('input', false);
            },
            setError(error) {
                this.error = error;
                this.passwords = '';
            }
        },
        created() {
            this.$nextTick(this.init);
        },
        destroyed() {
            this.close();
        }
    }
</script>

<style lang="less">

    @import "../../styles/base/reset.less";
    
    @icon-font-path: "../../styles/fonts/";
    @base-zindex: 1;
    @line-color: #E5E5E5;
    
   

    @font-face {
        font-family: 'icon';
        src:  url('@{icon-font-path}/wue-icon.eot?8tfw31');
        src:  url('@{icon-font-path}/wue-icon.eot?8tfw31#iefix') format('embedded-opentype'),
        url('@{icon-font-path}/wue-icon.ttf?8tfw31') format('truetype'),
        url('@{icon-font-path}/wue-icon.woff?8tfw31') format('woff'),
        url('@{icon-font-path}/wue-icon.svg?8tfw31#icon') format('svg');
        font-weight: normal;
        font-style: normal;
    }
   

    // 遮罩层
    // -----------------------------------------------------------------------------
    .mask(@bg-color: rgba(0, 0, 0, .4), @z-index: @base-zindex * 1500) {
        background-color: @bg-color;
        position: fixed;
        z-index: @z-index;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        .display-flex();
        .flex-justify-content(center);
        .flex-align-items(center);
    }

    .top-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid @color;
        .scaleY(0.5);
        .transform-origin(0 0);
    }

    .bottom-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid @color;
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
        border-left: 1px solid @color;
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
        border-right: 1px solid @color;
        .scaleX(.5);
        .transform-origin(0 0);
    }


    .wue-mask-keyboard {
        .mask(rgba(0, 0, 0, .4), @base-zindex * 500);
    }

    .wue-keyboard {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: @base-zindex * 500;
        .translate(0, 100%);
        .transition(transform .3s);
        background-color: #F7F7F7;
        &.keyboard-active {
            .translate(0, 0);
        }
    }

    .wue-keyboard-content {
        background-color: #FFF;
        margin-top: 1rem;
        position: relative;
        &:before {
            .top-line(@line-color);
        }
    }

    .wue-keyboard-title {
        overflow: hidden;
        padding: 1rem 0 0.6rem;
        color: #686868;
        margin-bottom: 1px; /* for old android */
        font-size: 1rem;
        text-align: center;
        background-color: #FFF;
    }

    .wue-keyboard-numbers {
        font-size: 1rem;
        background-color: #FFF;
        > li {
            width: 100%;
            .display-flex();
            > a {
                width: 1%; /* for old android */
                .flex(1);
                color: #686868;
                height: 3rem;
                position: relative;
                .display-flex();
                .flex-justify-content(center);
                .flex-align-items(center);
                &:not(:last-child):after {
                    .right-line(@line-color);
                }
                &:before {
                    .top-line(@line-color);
                }
            }
            
            >a:active{
                background-color: #F7F7F7;
            }
            
            &:last-child {
                > a:last-child,
                > a:nth-last-child(3) {
                    background-color: #F7F7F7;
                    font-size: 1rem;
                    color: #686868;
                }
                > a:last-child {
                    &:after {
                        font-family: 'icon' !important;
                        content: "\e73d";
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    .wue-keyboard-head {
        height: 3rem;
        .display-flex();
        .flex-justify-content(center);
        .flex-align-items(center);
        color: #686868;
        font-size: 1rem;
        position: relative;
        &:after {
            .bottom-line(@line-color);
        }
    }

    .wue-keyboard-password {
        margin: 0 1rem;
        .display-flex();
        position: relative;
        background-color: #FFF;
        &:after {
            content: '';
            width: 200%;
            height: 200%;
            .scale(.5);
            position: absolute;
            border: 1px solid @line-color;
            top: 0;
            left: 0;
            .transform-origin(0 0);
            .border-radius(4px);
        }
        li {
            .flex(1);
            position: relative;
            .display-flex();
            .flex-justify-content(center);
            .flex-align-items(center);
            height: 3rem;
            &:not(:last-child):after {
                content: '';
                width: 1px;
                height: 50%;
                position: absolute;
                right: 0;
                top: 25%;
                background-color: @line-color;
                .scaleX(.5);
            }
            i {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #000;
            }
        }
    }

    .wue-keyboard-error {
        padding: 2px .8rem;
        color: #F00;
        overflow: hidden;
        height: .5rem;
        line-height: .5rem;
        font-size: .24rem;
        text-align: left;
    }

</style>
