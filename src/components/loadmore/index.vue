<template>
  <div class="weui-loadmore"
       :class="{'weui-loadmore_line': (type === 'line' || type === 'dot'), 'weui-loadmore_dot': type === 'dot' }">
    <i class="weui-loading" v-if="type === 'default'"></i>
    <span class="weui-loadmore__tips" v-text="type === 'dot' ? '' : text"></span>
  </div>
</template>

<script>
  export default {
    name: 'wue-load-more',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      text: {
        type: String,
        default: '正在加载'
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/base/reset.less";
  @import '../../styles/widget/weui-tips/weui-mask.less';
  @import '../../styles/widget/weui-tips/weui-loadmore.less';
</style>
