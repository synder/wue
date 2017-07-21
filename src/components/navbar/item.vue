<template>
    <a class="wue-navbar__item" @click="onClick" :style="style">
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: 'wue-navbar-item',

        props: {
            id: String,
            disabled: Boolean
        },
        
        created(){
            if(!this.id){
                this.id = Math.random().toString() + Date.now();
            }  
        },

        methods: {
            onClick(){
                this.$emit('input', this.id);
                this.$emit('on-item-click', this.id);
            },
        },

        computed: {
            isSelected () {
                return this.id === this.$parent.value
            },

            style () {
                return {
                    borderWidth: this.$parent.lineWidth + 'px',
                    borderColor: this.$parent.activeColor,
                    color: this.isSelected ? this.$parent.activeColor : this.$parent.color,
                    borderBottom: this.isSelected ? `3px solid ${this.$parent.activeColor || this.$parent.backgroundColor}` : ''
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .wue-navbar__item {
        position: relative;
        display: block;
        flex: 1;
        padding: 13px 0;
        text-align: center;
        font-size: 15px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
</style>
