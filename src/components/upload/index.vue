<template>
    <div class="weui-uploader">
        <div class="weui-uploader__hd" v-if="title || limit">
            <p class="weui-uploader__title" v-if="title" v-html="title"></p>
            <div class="weui-uploader__info" v-if="limit">
                <span v-text="id"></span>/<span v-text="limit"></span>
            </div>
        </div>
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file weui-uploader__file_status" v-for="file in files" :style="file.style">
                    <div class="weui-uploader__file-content">
                        <i class="weui-icon-info" style="color: red;" v-if="file.status === 'fail'"></i>
                        <wue-circle :value="file.percent" :diameter="(width > height ? height : width) - 20"
                                    @click="onPause(file.id)" v-else-if="file.status === 'progress'"></wue-circle>
                    </div>
                </li>
            </ul>
            <div class="weui-uploader__input-box" :style="style">
                <input class="weui-uploader__input" ref="file" type="file" :accept="accept" :capture="capture"
                       :multiple="!!multiple">
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import "../../styles/base/reset.less";
    @import "../../styles/icon/weui-font.less";
    @import "../../styles/icon/weui-icon_font.less";
    @import "../../styles/widget/weui-cell/weui-uploader.less";
</style>

<script>
    import circle from '../circle/index.vue';
    import compress from '../../lib/file/compress.js';

    export default {
        name: 'wue-uploader',

        components: {
            'wue-circle': circle,
        },

        props: {
            value: Array,
            compress: Object,
            multiple: Boolean,
            auto: {
                type: Boolean,
                default: true
            },
            accept: {
                type: String,
                default: 'image/jpg,image/png'
            },
            capture: {
                type: String,
            },
            width: {
                type: Number,
                validator(value){
                    return value > 40;
                },
                default: 60
            },
            removable: Boolean,
            height: {
                type: Number,
                validator(value){
                    return value > 40;
                },
                default: 60
            },
            title: String,
            limit: Number,
            type: {
                type: String,
                default: 'file'
            },
            url: {
                type: String,
                required: true
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
            onBeforeQueued: Function,
            onQueued: Function,
            onBeforeSend: Function,
            onSuccess: {
                type: Function,
                required: true
            },
            onProgress: Function,
            onError: Function,
        },

        data(){
            return {
                id: 0,
                files: [],
            };
        },

        computed: {
            style(){
                return {
                    width: this.width + 'px',
                    height: this.height + 'px'
                };
            }
        },

        methods: {
            __initFunction(){
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
                        backgroundImage: 'url("' + (file.base64 || file.url) + '")',
                        width: this.width + 'px',
                        height: this.height + 'px'
                    };

                    self.files.push(file);
                };

                self._onBeforeSend = function (file, data, headers) {
                    if (self.onBeforeSend) {
                        return self.onBeforeSend.call(file, data, headers);
                    }
                    return true;
                };

                self._onSuccess = function (file, result) {
                    file.status = 'success';

                    if (self.onSuccess) {
                        let url = self.onSuccess(file, result);
                        if (url && typeof url === 'string') {
                            file.url = url;
                        }
                    }

                    self.files.forEach(function (item) {
                        if (item.id === file.id) {
                            self.$set(self.files, file.id, file);
                        }
                    });
                };

                self._onProgress = function (file, percent) {

                    file.status = 'progress';
                    file.percent = percent;

                    self.files.forEach(function (item) {
                        if (item.id === file.id) {
                            self.$set(self.files, file.id, file);
                        }
                    });

                    if (self.onProgress) {
                        self.onProgress.call(file, percent);
                    }
                };

                self._onError = function (file, err) {
                    file.status = 'fail';

                    self.files.forEach(function (item) {
                        if (item.id === file.id) {
                            self.$set(self.files, file.id, file);
                        }
                    });

                    if (self.onError) {
                        self.onError.call(file, err);
                    }
                };
            },

            init(){
                const self = this;

                if (self.$refs.file) {
                    self.$refs.file.onchange = function (event) {
                        const files = event.target.files;

                        if (files.length === 0) {
                            return;
                        }

                        if (!self.compress && self.type === 'file') {
                            // 以原文件方式上传
                            Array.prototype.forEach.call(files, (file) => {
                                file.id = self.id;
                                self.id += 1;

                                if (self._onBeforeQueued(file, files) === false) {
                                    return;
                                }

                                self.uploadFile(file);
                            });
                        } else {
                            // base64上传 和 压缩上传
                            Array.prototype.forEach.call(files, (file) => {
                                file.id = self.id;
                                self.id += 1;

                                if (self._onBeforeQueued(file, files) === false) {
                                    return;
                                }

                                compress(file, {
                                    compress: {
                                        width: self.compress.width || 200,
                                        height: self.compress.height || 200,
                                        quality: self.compress.quality || 0.85,
                                    },
                                    type: self.type
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

                xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.total === 0) {
                        return;
                    }
                    const percent = Math.ceil(evt.loaded / evt.total) * 100;
                    self._onProgress(file, percent);
                }, false);

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
                    self.upload(file);
                };

                file.stop = function () {
                    this.xhr.abort();
                };

                self._onQueued(file);

                if (self.auto) {
                    file.upload();
                }

                return file;
            },

            onPause(id){
                const self = this;
                let file = null;

                self.files.forEach(function (item) {
                    if (item.id === id) {
                        file = item;
                    }
                });

                if (file) {
                    if (file.status === 'pause') {
                        file.upload();
                    } else {
                        file.stop();
                        file.status = 'pause';
                    }

                    self.$set(self.files, file.id, file);
                }
            }
        },

        watch: {},

        mounted(){
            this.__initFunction();
            this.init();
        }
    }
</script>