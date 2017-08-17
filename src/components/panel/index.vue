<template>
    <div class="panel panel_access">
        <div class="panel__hd" v-if="showHeader">
            <slot name="header"></slot>
        </div>
        
        <div class="panel__bd">
            <slot></slot>
        </div>
        
        <div class="panel__ft" v-if="showFooter">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: 'wue-panel',
        
        computed: {
            showHeader(){
                return !!this.$slots.header;
            },

            showFooter(){
                return !!this.$slots.footer;
            }
        }
        
    }
</script>

<style lang="less">
    @import '../../styles/base/reset.less';
    @import '../../styles/widget/panel/panel.less';
</style>
