<template>
    <transition name="wue-fade">
        <div class="weui-gallery" style="display: block" v-if="visible" @click="onClick">
            <span class="weui-gallery__img" :style="style"></span>
            <div class="weui-gallery__opr">
                <a class="weui-gallery__del" @click.prevent.stop="onDeleteClick">
                    <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                </a>
            </div>
        </div>
    </transition>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/vue/transition.less';
    @import '../../styles/icon/weui-icon.less';
    @import '../../styles/widget/weui-cell/weui-gallery.less';
</style>

<script>
    export default {
        name: 'wue-gallery',
        
        props: {
            value: Boolean,
            img: String
        },
        
        data(){
            return {
                visible: this.value
            };
        },
        
        computed: {
            style(){
                return !this.value ? {} : {
                    backgroundImage: `url(${this.img})`
                };
            }
        },
        
        methods: {
            onDeleteClick(){
                this.$emit('delete', this);
            },
            
            onClick(){
                this.visible = false;
                this.$emit('input', this.visible);
            }
        }
    };
</script>