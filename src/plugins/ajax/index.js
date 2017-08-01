/**
 * @author synder on 2017/7/25
 * @copyright
 * @desc
 */
    
class AjaxRequest {

    constructor(options) {

        this.onBefore = options.onBefore;
        this.onSuccess = options.onSuccess;
        this.onError = options.onError || function (err) { console.error(err);};
        this.onAfter = options.onAfter;
        this.onProgress = options.onProgress;

        this.url = options.url;
        this.method = options.method;
        this.async = options.async || true;
        this.timeout = options.timeout || 0;
        this.username = options.username;
        this.password = options.password;
        this.type = options.type;
        this.headers = options.headers;
        this.fields = options.fields;
        this.data = options.data;

        this.jsonp = function (result) {
            const callback = function (res) {
                return res;
            };
            return eval(result);
        };
        this.ticker = false;     //时间函数
        this.hasTimeout = false; //是否已经超时
        this.crossDomain = false; //是否跨域

        this.accepts = {
            script: 'text/javascript, application/javascript, application/x-javascript',
            json: 'application/json',
            form: 'application/x-www-form-urlencoded',
            xml: 'application/xml, text/xml',
            html: 'text/html',
            text: 'text/plain',
            jsonp: 'application/javascript'
        };

        this.xhr = new XMLHttpRequest();
    }

    __appendQuery(query) {
        if (query) {
            for (let key in query) {
                if (query.hasOwnProperty(key)) {
                    let temp = query[key];

                    if (temp === null) {
                        continue;
                    }

                    if (temp === undefined) {
                        continue;
                    }

                    if (typeof temp === 'object') {
                        if (Array.isArray(temp)) {
                            temp = temp.join(',');
                        } else {
                            if (temp.toString) {
                                temp = temp.toString();
                            } else {
                                temp = JSON.stringify(temp);
                            }
                        }
                    }

                    this.url = (this.url + '&' + key + '=' + encodeURIComponent(temp));
                }
            }
        }

        this.url = this.url.replace(/[&?]{1,2}/, '?');
    }

    __dataType(mime) {
        let scriptTypeRE = /^(?:text|application)\/javascript/i;
        let xmlTypeRE = /^(?:text|application)\/xml/i;

        if (!mime) {
            return 'text';
        }

        mime = mime.split(';', 2)[0];
        mime = mime ? mime.toLowerCase() : '';

        if (mime === this.accepts.html) {
            return 'html';
        }

        if (mime === this.accepts.json) {
            return 'json';
        }

        if (scriptTypeRE.test(mime)) {
            return 'script';
        }

        if (xmlTypeRE.test(mime)) {
            return 'xml';
        }

        return 'text';
    }

    _setUrl(){
        const method = this.method.toUpperCase();

        if(method === 'GET' || method === 'DELETE'){
            this.__appendQuery(this.data);
            this.data = null;
        }
    }

    _setJsonp(){
        if (this.type === 'jsonp') {
            this.__appendQuery({
                callback: 'callback'
            });
        }
    }
    
    _setOpen(){
        this.xhr.open(this.method, this.url, this.async, this.username, this.password);
        if (this.onBefore && this.onBefore(this) === false) {
            return this.abort();
        }
    }
    
    

    _setCrossDomain() {
        let a = document.createElement('a');
        a.href = this.url;
        this.crossDomain = (window.location.protocol + '//' + window.location.host) !== (a.protocol + '//' + a.host);
        if (!this.crossDomain) {
            this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }

    _setTimeout() {
        const self = this;
        
        if(this.xhr.hasOwnProperty('ontimeout')){
            this.xhr.timeout = this.timeout;
            this.xhr.ontimeout = function (e) {
                self.onError(new Error('request timeout in ' + self.timeout + 'ms'));
            };
        }else{
            if (this.timeout > 0) {

                if (self.timeout < 100) {
                    console.warn('param timeout less than 100ms');
                }

                self.ticker = setTimeout(function () {
                    self.hasTimeout = true;
                    self.abort();
                    self.onError(new Error('request timeout in ' + self.timeout + 'ms'));
                }, self.timeout);
            }
        }
    }

    _setOnStateChange() {
        const self = this;
        
        self.xhr.onreadystatechange = function () {
            if (self.xhr.readyState === 4) {

                if(self.ticker){
                    clearTimeout(self.ticker);
                }
                
                if (self.hasTimeout === true) {
                    return;
                }

                self.onAfter && self.onAfter();

                if (self.xhr.status > 199 && self.xhr.status < 300 || self.xhr.status === 304) {

                    let result = self.xhr.responseText;

                    //返回的是二进制
                    if (self.xhr.responseType === 'arraybuffer' || self.xhr.responseType === 'blob') {
                        result = self.xhr.response;
                        return self.onSuccess(result);
                    }

                    let contentType = self.xhr.getResponseHeader('content-type');
                    let dataType = self.__dataType(contentType);

                    if (dataType === 'script') {
                        if(self.type.jsonp){
                            result = self.jsonp(result);
                        }else{
                            eval(result);
                        }
                    } else if (dataType === 'xml') {
                        result = self.xhr.responseXML;
                    } else if (dataType === 'json') {
                        try {
                            result = JSON.parse(result);
                        } catch (error) {
                            return self.onError(error);
                        }
                    }

                    return self.onSuccess(result);
                }

                let error = new Error(self.xhr.statusText);
                error.code = self.xhr.status;
                self.onError(error);
            }
        };
        
        if(self.onProgress){
            self.xhr.addEventListener("progress", self.onProgress, false);
        }
    }

    _setData(){
        
        if(this.data && Object.prototype.toString.call(this.data) === '[object Object]'){
            
            if(FormData && this.data instanceof FormData){
                return;
            }
            
            const type = this.type && this.type.toLowerCase();
            
            if(type === 'json'){
                this.data = JSON.stringify(this.data);
                this.xhr.setRequestHeader('Content-Type', this.accepts[type]);
            }else if(type === 'form'){
                let temp = [];
                for(let key in this.data){
                    if(this.data.hasOwnProperty(key)){
                        let value = this.data[key];
                        if(value !== null && value !== undefined){
                            temp.push(key + '=' + encodeURIComponent(value + ''));
                        }
                    }
                }
                this.data = temp.join('&');
                this.xhr.setRequestHeader('Content-Type', this.accepts[type]);
            }else{
                this.data = this.data + '';
            }
        }
    }

    _setFields() {
        if (this.fields && Object.prototype.toString.call(this.headers) === '[object Object]') {
            for (let key in this.fields) {
                if (this.fields.hasOwnProperty(key)) {
                    this.xhr[key] = this.fields[key];
                }
            }
        }
    }

    _setHeaders() {
        if (this.headers && Object.prototype.toString.call(this.headers) === '[object Object]') {
            for (let key in this.headers) {
                if (this.headers.hasOwnProperty(key) === true) {
                    this.xhr.setRequestHeader(key, this.headers[key]);
                }
            }
        }

        let mime = this.accepts[this.type && this.type.toLowerCase()];
        this.xhr.setRequestHeader('Accept', mime || '*/*');
        this.xhr.overrideMimeType && this.xhr.overrideMimeType(mime);
    }

    send() {
        this._setUrl();
        this._setJsonp();
        this._setOpen();
        this._setOnStateChange();
        this._setData();
        this._setCrossDomain();
        this._setTimeout();
        this._setFields();
        this._setHeaders();
        this.xhr.send(this.data);
        return this;
    }

    abort() {
        clearTimeout(this.ticker);
        this.ticker = null;
        this.xhr.onreadystatechange = function () {
        };
        this.xhr.abort();
        this.onAfter && this.onAfter(this);
        
        return this;
    }
}

const ajax = function (options) {
    let ajax = new AjaxRequest({
        url: options.url,
        method: options.method,
        async: options.async,
        type: options.type,
        timeout: options.timeout,
        username: options.username,
        password: options.password,
        onBefore: options.onBefore,
        onSuccess: options.onSuccess,
        onError: options.onError,
        onAfter: options.onAfter,
        data: options.data,
        headers: options.headers,
        fields: options.fields,
    });

    return ajax.send();
};

const post = function (url, data, callback, loading) {
    return ajax({
        url: url,
        method: 'POST',
        async: true,
        type: 'json',
        timeout: 200000,
        data: data,
        onBefore: function () {
            if (loading) {

            }
        },
        onSuccess: function (result) {
            callback(null, result);
        },
        onError: function (err) {
            callback(err);
        },
        onAfter: function () {
            if (loading) {

            }
        },
    });
};

const get = function (url, data, callback, loading) {
    return ajax({
        url: url,
        method: 'GET',
        type: 'json',
        async: true,
        timeout: 200000,
        data: data,
        onBefore: function () {
            if (loading) {

            }
        },
        onSuccess: function (result) {
            callback(null, result);
        },
        onError: function (err) {
            callback(err);
        },
        onAfter: function () {
            if (loading) {

            }
        },
    });
};

const put = function (url, data, callback, loading) {
    return ajax({
        url: url,
        method: 'PUT',
        type: 'json',
        async: true,
        timeout: 200000,
        data: data,
        onBefore: function () {
            if (loading) {

            }
        },
        onSuccess: function (result) {
            callback(null, result);
        },
        onError: function (err) {
            callback(err);
        },
        onAfter: function () {
            if (loading) {

            }
        },
    });
};

const del = function (url, data, callback, loading) {
    return ajax({
        url: url,
        method: 'DELETE',
        type: 'json',
        async: true,
        timeout: 200000,
        data: data,
        onBefore: function () {
            if (loading) {

            }
        },
        onSuccess: function (result) {
            callback(null, result);
        },
        onError: function (err) {
            callback(err);
        },
        onAfter: function () {
            if (loading) {

            }
        },
    });
};

const upload = function (file, domain = 'upload', options) {
    const formData = new FormData();
    
    let ajax = new AjaxRequest({
        url: options.url,
        method: options.method,
        async: options.async,
        type: options.type,
        timeout: options.timeout,
        username: options.username,
        password: options.password,
        onBefore: options.onBefore,
        onSuccess: options.onSuccess,
        onProgress: options.onProgress,
        onError: options.onError,
        onAfter: options.onAfter,
        data: options.data,
        headers: options.headers,
        fields: options.fields,
    });
    
    formData.append(domain, file);

    return ajax.send(formData);
};


export {ajax, get, post, put, del, upload};

export default {
    install (Vue) {
        Vue.prototype.$http = {
            ajax: ajax,
            get: get,
            post: post,
            put: put,
            del: del,
            upload: upload
        };
    }
};
