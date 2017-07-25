<template>
    <div class="weui-cell weui-cell_swiped">
        <div class="weui-cell__bd" ref="cell" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <wue-cell :icon="icon" :label="label" :to="to">
                <slot>
                    <span v-html="title"></span>
                </slot>
            </wue-cell>
        </div>
        <div class="weui-cell__ft" ref="buttons">
            <slot name="button">
                <a class="weui-swiped-btn weui-swiped-btn_warn" @click="swipeButtonClick('删除')">删除</a>
            </slot>
        </div>
    </div>
</template>

<script>

    import uuid from '../../lib/string/uuid.js';
    import Transform from 'css3transform';
    import Cell from './index.vue';
  

    export default {
        name: 'wue-cell-swipe',

        components: {
            'wue-cell': Cell
        },

        props: {
            id: {
                type: String,
                default: function () {
                    return uuid();
                }
            },
            icon: String,
            title: {
                type: String | Number
            },
            label: {
                type: String | Number
            },
            to: String,
        },

        data () {
            return {
                dragState: {},
                swipeButtons: [
                    {type: 'text', value: '删除'},
                    {type: 'text', value: '删除'},
                ]
            }
        },
        
        

        mounted () {
            this.isDragging = false;
            const cellBd = this.$refs.cell;
            Transform(cellBd, true);
        },

        methods: {
            touchStart (event) {
                event.preventDefault();

                if (this.isDragging) return;

                const cellBd = this.$refs.cell;

                this.dragState.startPositionX = event.changedTouches[0].clientX;
                this.dragState.startTranslateX = cellBd.translateX;
                this.dragState.startTimestamp = new Date();

                cellBd.style.transition = ''
            },

            touchMove (event) {
                event.preventDefault();
                this.isDragging = true;

                const deltaX = event.changedTouches[0].clientX - this.dragState.startPositionX;
                const cellBd = this.$refs.cell;
                const btnsWidth = this.$refs.buttons.clientWidth;

                let targetTranslateX;
                if (deltaX < 0) {
                    targetTranslateX = Math.abs(this.dragState.startTranslateX + deltaX) < btnsWidth ? this.dragState.startTranslateX + deltaX : -1 * btnsWidth
                } else {
                    targetTranslateX = this.dragState.startTranslateX + deltaX < 0 ? this.dragState.startTranslateX + deltaX : 0
                }
                cellBd.translateX = targetTranslateX
            },

            touchEnd (event) {
                event.preventDefault();

                this.isDragging = false;

                const cellBd = this.$refs.cell;
                const btnsWidth = this.$refs.buttons.clientWidth;
                this.dragState.endPositionX = event.changedTouches[0].clientX;
                this.dragState.endTranslateX = cellBd.translateX;
                this.dragState.totalDeltaX = this.dragState.endPositionX - this.dragState.startPositionX;

                this.dragState.endTimestamp = new Date();

                const touchTime = this.dragState.endTimestamp - this.dragState.startTimestamp;

                // 500ms 内当作点击处理
                if (touchTime <= 500 && parseInt(this.dragState.totalDeltaX) === 0) {
                    this.$children[0].$emit('click-in-cell-swipe', event)
                }

                if (this.dragState.startTranslateX === 0 && this.dragState.totalDeltaX < 0) {
                    if (Math.abs(this.dragState.totalDeltaX) >= 30) {
                        cellBd.translateX = -btnsWidth
                    } else {
                        cellBd.translateX = 0
                    }
                    cellBd.style.transition = 'all 200ms ease'
                } else if (this.dragState.startTranslateX === -btnsWidth && this.dragState.totalDeltaX > 0) {
                    if (Math.abs(this.dragState.totalDeltaX) >= 30) {
                        cellBd.translateX = 0
                    } else {
                        cellBd.translateX = -btnsWidth;
                    }
                    cellBd.style.transition = 'all 200ms ease';
                }
                this.dragState = {};
            },

            swipeButtonClick(text){
                this.$emit('swipe-button-click', this.id, text);
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/weui-cell/weui-cell-swiped.less';
</style>
