<template>
    <div class="wue-scroll-tab">
        <div class="wue-scroll-tab-nav">
            <a href="javascript:;" class="wue-scroll-tab-item"
               v-for="item in navList"
               :class="activeIndex == item._uid ? 'wue-scroll-tab-active' : ''"
               @click="moveHandler(item._uid)">
                <div class="wue-scroll-tab-icon"><i :class="item.icon"></i></div>
                <div class="wue-scroll-tab-title">{{item.label}}</div>
            </a>
        </div>
        <div class="wue-scroll-tab-content" ref="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'wue-scroll-tab',
        data() {
            return {
                scrolling: false,
                navList: [],
                activeIndex: 0,
                timer: null
            }
        },
        methods: {
            init() {
                this.scrollView = this.$refs.scrollView;

                this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;

                this.bindEvent();
            },
            addItem(panel) {
                this.navList.push(panel);
            },
            getPanels() {
                return this.$children.filter(item => item.$options.name === 'wue-scroll-tab-item');
            },
            bindEvent() {
                this.scrollView.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            setDefault() {
                const panels = this.getPanels();

                let num = 0;
                panels.forEach((panel) => {
                    if (panel.active) {
                        this.activeIndex = panel._uid;
                        this.moveHandler(panel._uid);
                    } else {
                        ++num;
                        if (num >= panels.length)
                            this.activeIndex = panels[0]._uid;
                    }
                });
            },
            moveHandler(uid) {
                if (this.scrolling)return;
                this.scrolling = true;

                const panels = this.getPanels();
                const itemOffsetTop = panels.filter(item => item._uid === uid)[0].$el.getBoundingClientRect().top;

                this.scrollView.scrollTop = itemOffsetTop + this.scrollView.scrollTop - this.contentOffsetTop + 2;
                this.activeIndex = uid;

                setTimeout(() => {
                    this.scrolling = false;
                }, 6);
            },
            scrollHandler() {
                if (this.scrolling)return;

                const panels = this.getPanels();
                const panelsLength = panels.length;
                const scrollBox = this.scrollView;
                const scrollBoxHeight = scrollBox.offsetHeight;
                const scrollBoxTop = scrollBox.scrollTop;
                const panelItemHeight = panels[0].$el.offsetHeight;

                if (scrollBoxTop >= panelItemHeight * panelsLength - scrollBoxHeight) {
                    this.activeIndex = panels[panelsLength - 1]._uid;
                    return;
                }

                panels.forEach((panel) => {
                    if (panel.$el.getBoundingClientRect().top <= this.contentOffsetTop) {
                        this.activeIndex = panel._uid;
                    }
                });
            }
        },
        watch: {
            navList() {
                this.setDefault();
            }
        },
        mounted() {
            this.init();
        },
        destroyed() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>

<style lang="less">
    
    @import "../../styles/base/reset.less";

    .bottom-line(@color, @zindex: 0) {
        content: '';
        position: absolute;
        z-index: @zindex;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid @color;
        .scaleX(o.5);
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
        .scaleX(o.5);
        .transform-origin(0 0);
    }


    .wue-scroll-tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .display-flex();
    }

    .wue-scroll-tab-nav {
        height: 100%;
        background-color: #F5F5F5;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
        z-index: 1;
        &:after {
            .right-line(#DFDFDF);
        }
    }

    .wue-scroll-tab-item {
        padding: 0 .4rem;
        height: 2.5rem;
        .display-flex();
        .flex-align-items(center);
        position: relative;
        z-index: 1;
        &.wue-scroll-tab-active {
            background-color: #FFF;
            &:before {
                .right-line(#FFF);
            }
            &:active {
                background-color: #FFF;
            }
        }
        &:after {
            .bottom-line(#DFDFDF);
        }
        &:before {
            .right-line(#DFDFDF);
        }
        &:active {
            background: none;
        }
    }

    .wue-scroll-tab-icon {
        margin-right: .5rem;
        font-size: 1rem;
        .display-flex();
        .flex-align-items(center);
        .flex-justify-content(center);
        > img {
            height: 1rem;
            display: inline-block;
        }
    }

    .wue-scroll-tab-title {
        font-size: 1rem;
        color: #666;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 6rem;
    }

    .wue-scroll-tab-content {
        height: 100%;
        background-color: #FFF;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .flex(1);
        padding: 0 .5rem .5rem .5rem;
        position: relative;
    }

    

</style>
