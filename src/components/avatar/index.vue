<template>
    <div class="wue-avatar" :style="style">
        <slot></slot>
        <input class="wue-avatar-input" ref="file" type="file" :accept="accept" :capture="!!capture" :multiple="false" v-if="upload">
    </div>
</template>

<style lang='less' scoped>
    
    @import "../../styles/base/reset.less";
    
    .wue-avatar {
        background-size: contain;
        background-clip: border-box;
        background-position: center center;
        .border-radius(50%);
        overflow: hidden;
        display: inline-block;

        .wue-avatar-input{
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .opacity(0);
            display: inline-block;
        }
    }
    
</style>

<script>
    //集成上传功能的头像
    import compress from '../../lib/file/compress.js';
    
    export default {
        name: 'wue-avatar',

        props: {
            value: {
                type: String,
            },
            accept:{
                type: String,
                default: 'image/jpg,image/png'
            },
            capture: Boolean,
            height: {
                type: Number,
                default: 60
            },
            width: {
                type: Number,
                default: 60
            },
            compress: Object,
            type: {
                type: String,
                default: 'file'
            },
            upload: Boolean,
            url: {
                type: String,
            },
            name: {
                type: String,
                default: 'file'
            },
            fields: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            headers:{
                type: Object,
                default: function () {
                    return {};
                }
            },
            background: String,
            border: {
                type: String
            },
            onSuccess: {
                type: Function,
            }
        },

        data(){
            return {
                id: 0,
                file: null,
                currentValue: this.value
            };
        },
        
        watch: {
            value(val){
                this.currentValue = val;
            },

            currentValue(val){
                this.$emit('input', val);
            }
        },

        computed: {
            style(){
                let temp = {
                    height: this.height + 'px',
                    width: this.width + 'px',
                    backgroundImage : 'url(' + this.currentValue + ')',
                };
                
                if(!this.currentValue && this.background){
                    temp.backgroundColor = this.background;
                }
                
                if(this.border){
                    temp.border = '0.01rem solid ' + this.border;
                }
                
                return temp;
            }
        },
        
        methods: {

            init(){
                const self = this;
                
                if(!self.onSuccess){
                    throw new Error('onSuccess is required');
                }

                self._onQueued = function (file) {
                    if(file.base64 || file.url){
                        self.currentValue =  file.base64 || file.url;
                    }
                };

                self._onSuccess = function (file, result) {
                    file.status = 'success';
                    
                    const url = self.onSuccess && self.onSuccess(file, result);
                    
                    if(url){
                        self.currentValue =  url;
                    }
                };

                self._onError = function (file, err) {
                    file.status = 'fail';
                    console.error(err);
                };

                if (self.$refs.file) {
                    self.$refs.file.onchange = function (event) {
                        const files = event.target.files;

                        if (files.length === 0) {
                            return;
                        }
                        
                        self.file = files[0];
                        
                        const compressParams = {
                            compress: {
                                width: parseInt(self.compress && self.compress.width ? self.compress.width : self.width * 3) || 100,
                                height: parseInt(self.compress && self.compress.height ? self.compress.height : self.height * 3) || 100,
                                quality: parseInt(self.compress && self.compress.quality ? self.compress.quality : self.quality * 3) || 0.85 ,
                            },
                            type: 'file'
                        };

                        compress(self.file, compressParams, function (blob) {
                            if (blob) {
                                self.uploadFile(blob);
                                self._onQueued(self.file);
                            }
                        });
                    };
                }

            },

            uploadXhr(file) {
                const self = this;

                const {name, type, lastModifiedDate} = file;

                const data = {
                    name: name,
                    type: type,
                    size: self.type === 'file' ? file.size : file.base64.length,
                    lastModifiedDate: lastModifiedDate
                };
                const headers = {};

                const formData = new FormData();
                const xhr = new XMLHttpRequest();

                file.xhr = xhr;

                // 设置参数
                Object.keys(data).forEach((key) => {
                    formData.append(key, data[key]);
                });

                if (self.type === 'file') {
                    formData.append(self.name, file, name);
                } else {
                    formData.append(self.name, file.base64);
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            try {
                                // 只支持json
                                const ret = JSON.parse(xhr.responseText);
                                self._onSuccess(file, ret);
                            } catch (err) {
                                self._onError(file, err);
                            }
                        } else {
                            self._onError(file, new Error('XMLHttpRequest response status is ' + xhr.status));
                        }
                    }
                };

                xhr.open('POST', self.url);

                Object.keys(self.fields).forEach((key) => {
                    xhr[key] = self.fields[key];
                });

                // 设置头部信息
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });

                xhr.send(formData);
            },

            uploadFile(file){

                const self = this;
                const URL = window.URL || window.webkitURL || window.mozURL;

                file.url = URL.createObjectURL(file);
                file.status = 'ready';

                file.upload = function () {
                    self.uploadXhr(file);
                };

                file.stop = function () {
                    this.xhr.abort();
                };

                file.upload();

                return file;
            },
        },

        mounted(){
            if(this.upload){
                this.init();
            }
        }
    }
</script>