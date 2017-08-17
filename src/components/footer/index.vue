<template>
  <div class="footer" :class="{'footer_fixed-bottom': !!bottom}">
    <p class="footer__links">
      <slot name="links">
        <a :href="link.href" class="footer__link" v-for="link in links" v-text="link.text"></a>
      </slot>
    </p>
    <p class="footer__text">
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
  @import '../../styles/widget/footer/footer.less';
</style>
