<template>
    <span class="wue-number-input">
        <a href="javascript:;" ref="minus"></a>
        <input type="text" ref="input" class="spinner-input" :readonly="readonly" v-model="counter" placeholder=""/>
        <a href="javascript:;" ref="add"></a>
    </span>
</template>

<script>
    export default {
        name: 'wue-number-input',
        data() {
            return {
                counter: 0,
                tapParams: {
                    timer: null,
                    tapStartTime: 0
                },
                params: {
                    max: 0,
                    min: -1
                }
            }
        },
        props: {
            unit: {
                default: 1,
                validator(val) {
                    return /^([1-9]\d*)$/.test(val);
                }
            },
            max: {
                default: 0,
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            min: {
                default: -1,
                validator(val) {
                    return /^((-?([1-9]\d*))|0)$/.test(val);
                }
            },
            longpress: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            value: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            }
        },
        methods: {
            init() {
                if (!this.checkParameters())return;

                this.setDefaultValue();

                this.bindEvents();
            },
            checkParameters() {
                const max = ~~this.max;
                const unit = ~~this.unit;
                const min = ~~this.min;

                if (max < unit && max !== 0) {
                    console.error('The parameter \'max\'(' + max + ') must be greater than or equal to \'unit\'(' + unit + ').');
                    return false;
                }

                if (max % unit !== 0) {
                    console.error('The parameter \'max\'(' + max + ') and \'unit\'(' + unit + ') must be multiple.');
                    return false;
                }

                if (min % unit !== 0 && min >= 0) {
                    console.error('The parameter \'min\'(' + min + ') and \'unit\'(' + unit + ') must be multiple.');
                    return false;
                }

                if (max < min && max !== 0) {
                    console.error('The parameter \'max\'(' + max + ') must be greater than to \'min\'(' + min + ').');
                    return false;
                }

                return true;
            },
            setDefaultValue() {
                const unit = ~~this.unit;
                const min = ~~this.min;
                const value = ~~this.value;

                if (~~value > 0) {
                    this.setValue(value);
                    return;
                }

                this.setValue(min < 0 ? unit : min);
            },
            calculation(type) {
                const max = ~~this.max;
                const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
                const unit = ~~this.unit;

                if (this.readonly)return;

                let val = ~~this.counter;
                let newVal;

                if (type === 'add') {
                    newVal = val + unit;
                    if (max !== 0 && newVal > max)return;
                } else {
                    newVal = val - unit;
                    if (newVal < min)return;
                }

                this.setValue(newVal);

                if (this.longPress) {
                    this.longPressHandler(type);
                }
            },
            setValue(val) {
                const max = ~~this.max;
                const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
                const unit = ~~this.unit;

                if (!/^(([1-9]\d*)|0)$/.test(val)) val = unit;

                if (val > max && max !== 0) val = max;

                if (val % unit > 0) {
                    val = val - val % unit + unit;
                    if (val > max && max !== 0) val -= unit;
                }

                if (val < min) val = min - min % unit;

                this.counter = val;
                this.$emit('input', val);
            },
            
            longPressHandler(type) {
                const currentDate = new Date().getTime() / 1000;

                let intervalTime = currentDate - this.tapParams.tapStartTime;

                if (intervalTime < 1) intervalTime = 0.5;

                let secondCount = intervalTime * 10;
                if (intervalTime === 30) secondCount = 50;
                if (intervalTime >= 40) secondCount = 100;

                this.tapParams.timer = setTimeout(() => {
                    this.calculation(type);
                }, 1000 / secondCount);
            },
            clearTapTimer() {
                clearTimeout(this.tapParams.timer);
            },
            bindEvents() {
                const add = this.$refs.add;
                const minus = this.$refs.minus;
                const events = {
                    mouseDownEvent: 'touchstart',
                    mouseUpEvent: 'touchend'
                };

                const isMobile = (window.Modernizr && !!window.Modernizr.touch) || (function () {
                        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                    })();

                if (!isMobile) {
                    events.mouseDownEvent = 'mousedown';
                    events.mouseUpEvent = 'mouseup';
                }

                add.addEventListener(events.mouseDownEvent, (e) => {
                    if (this.longPress) {
                        e.preventDefault();
                        e.stopPropagation();

                        this.tapParams.tapStartTime = new Date().getTime() / 1000;

                        add.addEventListener(events.mouseUpEvent, this.clearTapTimer);
                    }

                    this.calculation('add');
                });

                minus.addEventListener(events.mouseDownEvent, (e) => {
                    if (this.longPress) {
                        e.preventDefault();
                        e.stopPropagation();

                        this.tapParams.tapStartTime = new Date().getTime() / 1000;

                        minus.addEventListener(events.mouseUpEvent, this.clearTapTimer);
                    }

                    this.calculation('minus');
                });

                this.$refs.input.addEventListener('change', () => {
                    this.setValue(~~this.counter);
                });
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="less">
    
    @import "../../styles/base/reset.less";

    .tap-color(@color, @opacity: .9) {
        background-color: @color;
        &:active {
            background-color: @color * @opacity;
        }
    }
    
    .wue-number-input {
        border: 1px solid #EAE8E8;
        .border-radius(1px);
        display: inline-block;
        overflow: hidden;
        height: 2.3rem;
        > a {
            float: left;
            width: 2.3rem;
            height: 2.3rem;
            line-height: 2.2rem;
            text-align: center;
            font-weight: bold;
            vertical-align: middle;
            color: #666;
            letter-spacing: 0;
            .tap-color(#F8F8F8, .95);
            &:after {
                color: #777;
                font-size: 1rem;
            }
            &:first-child:after {
                content: '-';
            }
            &:last-child:after {
                content: '+'
            }
        }
        > input {
            letter-spacing: 0;
            float: left;
            width: 2.3rem;
            height: 2.3rem;
            line-height: 2.2rem;
            text-align: center;
            color: #666;
            border: none;
            font-size: 1rem;
            background-color: #FFF;
        }
    }
</style>
