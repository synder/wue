<template>
  <i :class="classObject"></i>
</template>

<script>
  export default {
    name: 'wue-icon',

    props: {
      type: {
        type: String,
        required: true
      },
      large: Boolean
    },

    computed: {
      classObject: function () {
        let classType = `weui-icon-${this.type}`

        return {
          [classType]: true,
          'weui-icon_msg': this.large
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/icon/weui-font.less';
  @import '../../styles/icon/weui-icon_font.less';
</style>
