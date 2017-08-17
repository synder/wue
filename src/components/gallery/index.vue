<template>
    <transition name="wue-fade">
        <div class="gallery" style="display: block" v-if="visible" @click="onClick">
            <span class="gallery__img" :style="style"></span>
            <div class="gallery__opr">
                <a class="gallery__del" @click.prevent.stop="onDeleteClick">
                    <i class="icon-delete icon_gallery-delete"></i>
                </a>
            </div>
        </div>
    </transition>
</template>

<style lang='less' rel="stylesheet/less">
    @import '../../styles/base/reset.less';
    @import '../../styles/vue/transition.less';
    @import '../../styles/icon/icon.less';
    @import '../../styles/widget/cell/gallery.less';
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