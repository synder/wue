<template>
    <div class="wue-timeline">
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'wue-timeline',
        props: {
            value: String,
            color: String,
            icon: {
                type: Boolean,
                default: true
            },
            prevID: {
                type: String,
                default: 'wue-timeline-id-'
            }
        },
        
        data(){
            return {
                active: this.value ? this.prevID + this.value :  null
            }
        },
        
        watch: {
            value(val){
                if(val){
                    this.go(val);
                }
            },
        },
        
        methods: {
            setChildProps () {
                if (!this.$children) {
                    return;
                }
                
                const self = this;
                const length = this.$children.length;
                
                if(!self.active){
                    self.active = self.$children[0].uuid ? self.$children[0].uuid : this.prevID + 0;
                }
                
                this.$children.forEach(function(child, index){
                    
                    child.isLast = index === (length - 1);
                    
                    if(!child.uuid){
                        child.uuid = self.prevID + index;
                    }

                    child.active = child.uuid === self.active;
                    
                    console.log();
                });
            },
            
            go(id){
                this.active = id ? this.prevID + id : this.active;
                this.setChildProps();
            }
        },
    }
</script>

<style lang="less">
    
    @import "../../styles/base/reset.less";

    .wue-timeline {
        padding: 1rem;
    }

    .wue-timeline > ul > li {
        list-style: none;
    }
</style>
