<template>
    <div class="weui-toptips weui-toptips_warn" v-show="visible" v-html="message"></div>
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: true
            },
            message: String
        }
    }
</script>

<style scoped lang="less">
  @import '../../styles/base/reset.less';
  @import '../../styles/widget/weui-cell/weui-form/weui-form_common.less';

  .weui-toptips {
    display: block;
  }
</style>
