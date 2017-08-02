<template>
    <div class="pull-down-container">
        <div class="pull-down-header" v-bind:style="{'height': pullDown.height + 'px'}">
            <div class="pull-down-content">
                <i class="pull-down-content--icon" v-bind:class="iconClass"></i>
                <span class="pull-down-content--label">{{label}}</span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    // status of pull down
    const STATUS_ERROR = -1;
    const STATUS_START = 0;
    const STATUS_READY = 1;
    const STATUS_REFRESH = 2;
    // labels of pull down
    const LABELS = ['数据异常', '下拉刷新数据', '松开刷新数据', '数据刷新中...'];
    const PULL_DOWN_HEIGHT = 60;
    const ANIMATION = 'height .2s ease';

    export default {
        name: 'wue-pull-fresh',
        props: {
            onRefresh: {
                type: Function
            },
            config: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                pullDown: {
                    status: 0,
                    height: 0,
                    msg: ''
                }
            };
        },
        computed: {
            label() {
                // label of pull down
                if (this.pullDown.status === STATUS_ERROR) {
                    return this.pullDown.msg;
                }
                return this.customLabels[this.pullDown.status + 1];
            },
            customLabels() {
                let errorLabel = this.config.errorLabel || LABELS[0];
                let startLabel = this.config.startLabel || LABELS[1];
                let readyLaebl = this.config.readyLabel || LABELS[2];
                let loadingLabel = this.config.loadingLabel || LABELS[3];
                return [errorLabel, startLabel, readyLaebl, loadingLabel];
            },
            iconClass() {
                // icon of pull down
                if (this.pullDown.status === STATUS_REFRESH) {
                    return 'pull-down-refresh';
                } else if (this.pullDown.status === STATUS_ERROR) {
                    return 'pull-down-error';
                }
                return '';
            }
        },
        mounted() {
            this.$nextTick(() => {
                let el = this.$el;
                let pullDownHeader = el.querySelector('.pull-down-header');
                let icon = pullDownHeader.querySelector('.pull-down-content--icon');
                /**
                 * reset the status of pull down
                 * @param {Object} pullDown the pull down
                 */
                let resetPullDown = (pullDown, withAnimation) => {
                    if (withAnimation) {
                        pullDownHeader.style.transition = ANIMATION;
                    }
                    pullDown.height = 0;
                    pullDown.status = STATUS_START;
                };
                // store of touch position, include start position and distance
                let touchPosition = {
                    start: 0,
                    distance: 0
                };

                // bind touchstart event to store start position of touch
                el.addEventListener('touchstart', e => {
                    touchPosition.start = e.touches.item(0).pageY;
                });

                /**
                 * bind touchmove event, do the following:
                 * first, update the height of pull down
                 * finally, update the status of pull down based on the distance
                 */
                el.addEventListener('touchmove', e => {
                    let distance = e.touches.item(0).pageY - touchPosition.start;
                    // limit the height of pull down to 180
                    distance = distance > 180 ? 180 : distance;
                    // update touchPosition and the height of pull down
                    touchPosition.distance = distance;
                    this.pullDown.height = distance;
                    /**
                     * if distance is bigger than the height of pull down
                     * set the status of pull down to STATUS_READY
                     */
                    if (distance > PULL_DOWN_HEIGHT) {
                        this.pullDown.status = STATUS_READY;
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        /**
                         * else set the status of pull down to STATUS_START
                         * and rotate the icon based on distance
                         */
                        this.pullDown.status = STATUS_START;
                        icon.style.transform = 'rotate(' + distance / PULL_DOWN_HEIGHT * 180 + 'deg)';
                    }
                });

                // bind touchend event
                el.addEventListener('touchend', e => {
                    
                    const self = this;
                    
                    pullDownHeader.style.transition = ANIMATION;
                    // reset icon rotate
                    icon.style.transform = '';
                    // if distance is bigger than 60
                    if (touchPosition.distance > PULL_DOWN_HEIGHT) {
                        self.pullDown.height = PULL_DOWN_HEIGHT;
                        self.pullDown.status = STATUS_REFRESH;
                        // trigger refresh callback
                        if (self.onRefresh && typeof self.onRefresh === 'function') {
                            let res = self.onRefresh();
                            // if onRefresh return promise
                            if (res && res.then && typeof res.then === 'function') {
                                res.then(result => {
                                    resetPullDown(self.pullDown, true);
                                }, error => {
                                    // show error and hide the pull down after 1 second
                                    self.pullDown.msg = error || self.customLabels[0];
                                    self.pullDown.status = STATUS_ERROR;
                                    setTimeout(() => {
                                        resetPullDown(self.pullDown, true);
                                    }, 1000);
                                });
                            } else {
                                resetPullDown(self.pullDown);
                            }
                        } else {
                            resetPullDown(self.pullDown);
                        }
                    } else {
                        resetPullDown(self.pullDown);
                    }
                    // reset touchPosition
                    touchPosition.distance = 0;
                    touchPosition.start = 0;
                });
               
                pullDownHeader.addEventListener('transitionend', () => {
                    pullDownHeader.style.transition = '';
                });
                pullDownHeader.addEventListener('webkitTransitionEnd', () => {
                    pullDownHeader.style.transition = '';
                });
            });
        }
    };
</script>

<style lang="less">

    @import "../../styles/base/reset.less";
    
    .pull-down-header {
        width: 100%;
        height: 0;
        overflow: hidden;
        position: relative;
        background-color: #2c3133;
    }

    .pull-down-content {
        position: absolute;
        max-width: 90%;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        height: 40px;
        color: #d5d5d5;
        border-left: 20px solid transparent;
        font-family: "noto-thin", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        text-align: center;

        .pull-down-content--icon {
            float: left;
            height: 20px;
            width: 20px;
            margin-top: 10px;
            background-size: 20px 20px;
        }

        .pull-down-refresh {
            display: inline-block;
            vertical-align: middle;
            .animation(weuiLoading 1s steps(12, end) infinite);
            background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
            background-size: 100%;
        }

        .pull-down-error {
            background-size: 20px 20px;
        }
        
        .pull-down-content--label {
            float: left;
            height: 20px;
            line-height: 20px;
            margin-top: 10px;
        }
    }

    @keyframes rotate {
        from {
            .rotate(0deg);
        }
        to {
            .rotate(360deg);
        }
    }
</style>
