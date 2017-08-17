<template>
    <div class="wue-chat" touchstar>
        <div class="box-body scroll-wrapper">
            <div class="scroll-content">
                <div class="chat-content" ref="content">
                    <div class="clearfix" v-for="msg in messages">
                        <div class="message" v-bind:class="{'me': msg.from_me, 'others': !msg.from_me}">
                            <div class="avatar" v-bind:data-author-id="msg.author_id">
                                <img v-bind:src="msg.author_avatar" v-bind:alt="msg.author_name">
                            </div>
                            <div class="content">
                                <p class="author_name" v-text="msg.author_name"></p>
                                <div class="bubble" v-bind:class="{'bubble-primary': msg.from_me, 'right':msg.from_me, 'bubble-default': !msg.from_me, 'left':!msg.from_me}">
                                    <div class="bubble-count">
                                        <div class="plain">
                                            <pre v-text="msg.message_content"></pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a ref="bottom"></a>
                </div>
            </div>
        </div>

        <div class="box-footer">
            <wue-input-cell v-model="message" @enter="send">
                <button class="vcode-btn" @click="send">发送</button>
            </wue-input-cell>
        </div>
    </div>
</template>

<style lang='less'>
    @import '../../styles/base/reset.less';
    @import '../../styles/chat/base.less';
    @import '../../styles/widget/cell/form/vcode.less';
    
    .cell{
        padding: 0;
        margin: 0;
    }
</style>

<script>
    
    import cells from '../cells/index.vue';
    import input from '../cell/input.vue';
    import button from '../button/index.vue';
    
    export default {
        name: 'wue-chat',

        components: {
            'wue-cells': cells,
            'wue-input-cell': input,
            'wue-button': button,
        },
        
        props: {
            
        },
        
        data(){
            return {
                page: {
                    height: '100%'
                },
                messages: [],
                message: ''
            }
        },

        methods: {
            
            scroll: function () {
                if(this.$refs.content){
                    this.$refs.content.scrollTop = 1000;
                }
            },

            send: function () {
                if(this.message){
                    this.messages.push({
                        author_id: 2,
                        author_avatar: 'http://c1.mifile.cn/f/i/hd/2016051101/a-lwq.png',
                        author_name: '黎万强',
                        message_id: 2,
                        message_type: 'plain',
                        from_me: true,
                        message_content: '雷军 你好，are you ok？'
                    });
                    this.scroll();
                }
            },

            
        },

        mounted: function() {
            const self = this;
            
            setTimeout(function () {
                self.messages.push({
                    author_id: 1,
                    author_avatar: 'http://c1.mifile.cn/f/i/hd/2016051101/a-lj.png',
                    author_name: '雷军',
                    message_id: 1,
                    message_type: 'plain',
                    from_me: false,
                    message_content: '小米的朋友 你好，are you ok？'
                },);
            }, 1000);
        }
    }
</script>