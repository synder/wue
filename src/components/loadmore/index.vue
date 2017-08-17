<template>
  <div class="loadmore"
       :class="{'loadmore_line': (type === 'line' || type === 'dot'), 'loadmore_dot': type === 'dot' }">
    <i class="loading" v-if="type === 'default'"></i>
    <span class="loadmore__tips" v-text="type === 'dot' ? '' : text"></span>
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
        type: String | Number,
        default: '正在加载'
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/base/reset.less";
  @import '../../styles/widget/tips/mask.less';
  @import '../../styles/widget/tips/loadmore.less';
</style>
