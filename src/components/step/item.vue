<template>
    <div class="wue-step-item" :class=" { 'wue-step-item-with-tail' : !currentStepLast} ">
        
        <div :class="'wue-step-item-tail ' + 'wue-step-item-tail-' + currentStatus" 
             v-show="!currentStepLast"
             :style="{right: $parent.gutter + 'px'}"></div>
        
        <div :class="'wue-step-item-head ' + 'wue-step-item-head-' + currentStatus">
            <div class="wue-step-item-head-inner">
                <span v-if="!icon && currentStatus!='finish'" class="wue-step-item-icon">{{currentStepNumber}}</span>
                <span v-else :class="'wue-step-item-icon ' + 'wue-step-item-' + iconName">
                    <i class="weui-icon-success-no-circle wue-step-item-checked"></i>
                 </span>
            </div>
        </div>
        <div :class="'wue-step-item-main ' + 'wue-step-item-main-' + currentStatus"
             :style="{paddingRight: currentStepLast ? 0 : $parent.gutter + 'px'}">
            <span class="wue-step-item-title" v-text="title"></span>
        </div>
        
    </div>
</template>

<script>

    export default {
        name: 'wue-step-item',
        
        props: {
            title: String | Number,
            stepNumber: Number,
            stepLast: Boolean,
            icon: String,
            status: String,
            tailWidth: Object
        },
        computed: {
            iconName () {
                return this.icon || 'check'
            }
        },
        created () {
            this.currentStatus = this.status;
            this.currentStepLast = this.stepLast;
            this.currentStepNumber = this.stepNumber;
        },
        data () {
            return {
                currentStatus: '',
                currentStepLast: false,
                currentStepNumber: 1
            }
        },
        components: {
           
        }
    }
</script>


<style lang="less" scoped>
    @import "../../styles/base/reset.less";
    @import '../../styles/icon/weui-font.less';
    @import '../../styles/icon/weui-icon_font.less';
    
    .wue-step-item {
        display: inline-block;
        position: relative;
        overflow: hidden;
    }

    .wue-step-item-with-tail {
        flex: 1;
    }

    .wue-step-item-tail {
        height: 1px;
        position: absolute;
        left: 0;
        top: 12px;
        padding: 0 0;
        .transition(all 0.4s ease 0s);
    }

    .wue-step-item-tail-finish {
        background: #09bb07 none repeat scroll 0 0;
    }

    .wue-step-item-tail-process, .wue-step-item-tail-wait {
        background: #CCC none repeat scroll 0 0;
    }

    .wue-step-item-icon {
        width: 22px;
        height: 22px;
        display: inline-block;
        text-align: center;
        margin: 0;
        padding: 0;
    }

    .wue-step-item-checked::before {
        font-size: 15px !important;
        line-height: 22px;
        margin: 0 !important;
        transform: translateY(-4px);
    }

    .wue-step-item-title {
        font-size: 0.8rem;
    }
    
    .wue-step-item-main-finish{
        color: #09bb07 !important;
    }

    .wue-step-item-head {
        position: relative;
        display: inline-block;
        margin-right: -4px;

        .wue-step-item-head-inner {
            width: 22px;
            height: 22px;
            line-height: 22px;
            .border-radius(99px);
            text-align: center;
            font-size: 14px;
            .transition(all 0.4s ease 0s);
            background: #fff none repeat scroll 0 0;
        }
    }
    .wue-step-item-head-finish .wue-step-item-head-inner {
        border: 1px solid #09bb07;
        color: #09bb07;
    }

    .wue-step-item-head-process .wue-step-item-head-inner {
        border: 1px solid #09bb07;
        color: #FFF;
        background: #09bb07 none repeat scroll 0 0;
    }

    .wue-step-item-head-wait .wue-step-item-head-inner {
        border: 1px solid #888;
        color: #888;
    }

    .wue-step-item-main {
        display: inline-block;
        position: relative;
        vertical-align: top;
        color: #888;
        padding-left: 5px;
        background-color: #fff;
    }

    .wue-step-item-main-process {
        font-weight: bold;
        color: #666;
    }
</style>