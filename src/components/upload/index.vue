<template>

    <div class="weui-uploader">
        <div class="weui-uploader__hd">
            <p class="weui-uploader__title">图片上传</p>
            <div class="weui-uploader__info">
                <span v-text="id"></span>/<span v-text="limit"></span>
            </div>
        </div>
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file weui-uploader__file_status" v-for="file in files"
                    :style="file.style">
                    <div class="weui-uploader__file-content">
                        <i class="weui-icon-warn" v-if="file.status === 'fail'"></i>
                    </div>
                </li>
            </ul>
            <div class="weui-uploader__input-box">
                <input id="uploaderInput" class="weui-uploader__input" ref="file" type="file" accept="image/*" capture="camera" multiple="">
            </div>
        </div>
    </div>
    
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset.less";
    @import "../../styles/widget/weui-cell/weui-uploader.less";

</style>

<script>
    import compress from './compress.js';

    export default {
        name: '',

        props: {
            compress: Object,
            auto: {
                type: Boolean,
                default: true
            },
            limit: {
                type: Number,
                default: 5
            },
            type: {
                type: String,
                default: 'file'
            },
            url: {
                type: String,
                required: true
            },
            fileVal: {
                type: String,
                default: 'file'
            },
            xhrFields: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            onBeforeQueued: Function,
            onQueued: Function,
            onBeforeSend: Function,
            onSuccess: Function,
            onProgress: Function,
            onError: Function,
        },

        data(){
            return {
                id: 0,
                files: [
                    
                ]
            };
        },

        computed: {},

        methods: {
            init(){
                const self = this;


                self._onBeforeQueued = function (file, files) {
                    if (self.onBeforeQueued) {
                        return !!self.onBeforeQueued.call(file, files);
                    }
                    return true;
                };

                self._onQueued = function (file) {
                    if (self.onQueued) {
                        self.onQueued.call(file);
                    }

                    file.style = {
                        backgroundImage: 'url("' + (file.base64 || file.url) + '")'
                    };

                    self.files.push(file);
                };

                self._onBeforeSend = function (file, data, headers) {
                    if (self.onBeforeSend) {
                        return self.onBeforeSend.call(file, data, headers);
                    }
                    return true;
                };

                self._onSuccess = function (file, ret) {
                    file.status = 'success';
                    if (self.onSuccess) {
                        self.onSuccess(file, ret);
                    }
                };

                self._onProgress = function (file, percent) {
                    if (self.onProgress) {
                        self.onProgress.call(file, percent)
                    }

                };

                self._onError = function (file, err) {
                    
                    file.status = 'fail';
                    
                    if (self.onError) {
                        if (!self.onError.call(file, err)) {
                            //todo 上传错误提示
                        }
                    }
                };

                if (self.$refs.file) {
                    self.$refs.file.onchange = function (event) {
                        const files = event.target.files;

                        if (files.length === 0) {
                            return;
                        }

                        if (!self.compress && self.type === 'file') {
                            // 以原文件方式上传
                            Array.prototype.forEach.call(files, (file) => {
                                self.id += 1;
                                file.id = self.id;

                                if (self._onBeforeQueued(file, files) === false) {
                                    return;
                                }

                                self.uploadFile(file);
                            });
                        } else {
                            // base64上传 和 压缩上传
                            Array.prototype.forEach.call(files, (file) => {
                                self.id += 1;
                                file.id = self.id;

                                if (self._onBeforeQueued(file, files) === false) {
                                    return;
                                }

                                compress(file, {
                                    width: self.compress.width,
                                    height: self.compress.height,
                                    quality: self.compress.quality || 0.8
                                }, function (blob) {
                                    if (blob) {
                                        self.uploadFile(blob);
                                    }
                                });
                            });
                        }
                    };
                }

            },

            upload(file) {
                const self = this;

                const {name, type, lastModifiedDate} = file;

                const data = {
                    name: name,
                    type: type,
                    size: self.type === 'file' ? file.size : file.base64.length,
                    lastModifiedDate: lastModifiedDate
                };
                const headers = {};

                if (self._onBeforeSend(file, data, headers) === false) {
                    return;
                }

                file.status = 'progress';

                self._onProgress(file, 0);

                const formData = new FormData();
                const xhr = new XMLHttpRequest();

                file.xhr = xhr;

                // 设置参数
                Object.keys(data).forEach((key) => {
                    formData.append(key, data[key]);
                });

                if (self.type === 'file') {
                    formData.append(self.fileVal, file, name);
                } else {
                    formData.append(self.fileVal, file.base64);
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

                xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.total === 0) {
                        return;
                    }
                    const percent = Math.ceil(evt.loaded / evt.total) * 100;
                    self._onProgress(file, percent);
                }, false);

                xhr.open('POST', self.url);

                Object.keys(self.xhrFields).forEach((key) => {
                    xhr[key] = self.xhrFields[key];
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
                    self.upload(file);
                };

                file.stop = function () {
                    self.xhr.abort();
                };

                self._onQueued(file);

                if (self.auto) {
                    file.upload();
                }

                return file;
            }
        },

        watch: {},

        mounted(){
            this.init();
        }
    }
</script>