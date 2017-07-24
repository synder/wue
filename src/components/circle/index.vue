<template>
    <div class="wue-circle" :style="style" @click="click">
        <svg :width="diameter" :height="diameter" :viewBox="'0 0 ' + diameter + ' ' + diameter">
            <path :d="pathString" :stroke="trailColor" :stroke-width="lineWidth" fill="none"/>
            <path :d="pathString" stroke-linecap="round" :stroke="strokeColor" :stroke-width="lineWidth"
                  :style="pathStyle"
                  :fill="fillColor"/>
        </svg>
        <div class="wue-circle-content">
            <slot>
                <p :style="{color: strokeColor}">
                    <span v-text="currentValue"></span>%
                </p>
               
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wue-circle',

        props: {
            diameter: {
                type: Number,
                default: 100
            },
            lineWidth: {
                type: Number,
                default: 4
            },
            strokeColor: {
                type: String,
                default: '#1AAD19'
            },
            trailColor: {
                type: String,
                default: '#D9D9D9'
            },
            fillColor: {
                type: String,
                default: 'none'
            },
            speed: {
                type: Number,
                default: 500
            },
            value: {
                type: Number | String,
                default: 0
            }
        },

        data () {
            return {
                currentValue: parseFloat(this.value) || 0
            }
        },

        computed: {
            style () {
                return {
                    width: this.diameter + 'px',
                    height: this.diameter + 'px',
                    textAlign: 'center',
                }
            },

            pathRadius () {
                return (this.diameter - this.lineWidth) / 2
            },

            radius () {
                return this.diameter / 2
            },

            pathString () {
                return `M ${this.radius},${this.radius} m 0,-${this.pathRadius}
                        a ${this.pathRadius},${this.pathRadius} 0 1 1 0,${2 * this.pathRadius}
                        a ${this.pathRadius},${this.pathRadius} 0 1 1 0,-${2 * this.pathRadius}`
            },

            len () {
                return Math.PI * 2 * this.pathRadius
            },

            pathStyle () {
                return {
                    'stroke-dasharray': `${this.len}px ${this.len}px`,
                    'stroke-dashoffset': `${((100 - this.currentValue) / 100 * this.len)}px`,
                    'transition': `stroke-dashoffset ${this.speed}ms ease 0s, stroke ${this.speed}ms ease`
                }
            }
        },
        methods: {
            click(){
                this.$emit('click');
            }
        },

        watch: {
            currentValue (val) {
                this.$emit('input', val)
            },

            value (val) {
                this.currentValue = val
            }
        }
    }
</script>

<style scoped lang="less">
    .wue-circle {
        position: relative;
        text-align: center;
        margin: 0 auto;

        .wue-circle-content {
            width: 100%;
            text-align: center;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
