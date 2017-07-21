<template>
  <div class="weui-footer" :class="{'weui-footer_fixed-bottom': !!bottom}">
    <p class="weui-footer__links">
      <slot name="links">
        <a :href="link.href" class="weui-footer__link" v-for="link in links" v-text="link.text"></a>
      </slot>
    </p>
    <p class="weui-footer__text">
      <slot>
        <span v-html="text"></span>
      </slot>
    </p>
  </div>
</template>

<script>

  export default {
    name: 'wue-footer',

    components: {
    },

    props: {
      text: String | Number, 
        bottom: Boolean,
      links: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/base/reset.less';
  @import '../../styles/widget/weui-footer/weui-footer.less';
</style>
