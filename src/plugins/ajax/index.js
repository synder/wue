/**
 * @author synder on 2017/7/25
 * @copyright
 * @desc
 */

class AjaxRequest {

    constructor(options) {

        this.onBefore = options.onBefore;
        this.onSuccess = options.onSuccess;
        this.onError = options.onError;
        this.onAfter = options.onAfter;

        this.url = options.url;
        this.method = options.method;
        this.async = options.async || true;
        this.headers = options.headers;
        this.timeout = options.timeout || 20000;
        this.username = options.username;
        this.password = options.password;
        this.fields = options.fields;
        this.data = options.data;
        this.type = options.type || 'text';

        this.ticker = false;     //时间函数
        this.hasTimeout = false; //是否已经超时

        this.crossDomain = false; //是否跨域

        this.accepts = {
            script: 'text/javascript, application/javascript, application/x-javascript',
            json: 'application/json',
            xml: 'application/xml, text/xml',
            html: 'text/html',
            text: 'text/plain',
        };

        this.init();
    }

    init() {
        this.xhr = new XMLHttpRequest();
        this.open();
        this.setHeader();
        this.setTimeout();
        this.onStateChange();
        this.setFields();
        this.send();
    }
    
    setFields(){
        if (this.fields) {
            for (let name in this.fields) {
                if(this.fields.hasOwnProperty(name)){
                    this.xhr[name] = this.fields[name];
                }
            }
        }
    }

    mimeToDataType(mime) {
        let scriptTypeRE = /^(?:text|application)\/javascript/i;
        let xmlTypeRE = /^(?:text|application)\/xml/i;
        
        if (mime) {
            mime = mime.split(';', 2)[0];
        }

        if(!mime){
            return 'text';
        }
        
        return mime === this.accepts.html ? 'html' : mime === this.accepts.json ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml';
    }

    onStateChange() {
        const self = this;
        this.xhr.onreadystatechange = function () {
            if (self.xhr.readyState === 4) {

                if (self.hasTimeout === true) {
                    return;
                }
                
                if (self.xhr.status > 199 && self.xhr.status < 300 || self.xhr.status === 304) {

                    let result = self.xhr.responseText;
                    
                    let contentType = self.xhr.getResponseHeader('content-type');
                    
                    let dataType = self.mimeToDataType(contentType);
                    
                    if (dataType === 'script') {
                        result = eval(result);
                    } else if (dataType === 'xml') {
                        result = self.xhr.responseXML
                    } else if (dataType === 'json') {
                        try{
                            result = JSON.parse(result);
                        }catch (error){
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
    }

    setTimeout() {
        const self = this;
        self.ticker = setTimeout(function () {
            self.onError(new Error('request timeout'));
            self.hasTimeout = true;
            self.abort();
        }, self.timeout);
    }

    setHeader() {
        if (this.headers) {
            for (let key in this.headers) {
                if (this.headers.hasOwnProperty(key)) {
                    this.xhr.setRequestHeader(key, this.headers[key]);
                }
            }
        }
        
        let mime = this.accepts[this.type];

        this.xhr.setRequestHeader('Accept', mime || '*/*');

        this.xhr.overrideMimeType && this.xhr.overrideMimeType(mime);

        if (!this.crossDomain) {
            this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        
        if(this.data){
            this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
    }

    open() {
        this.hasTimeout = false;
        this.xhr.open(this.method, this.url, this.async, this.username, this.password);
    }

    send() {
        this.xhr.send(this.data);
    }

    abort() {
        clearTimeout(this.ticker);
        this.xhr.onreadystatechange = function () {};
        this.xhr.abort();
    }
}

const ajax = function () {

};

const post = function () {

};

const get = function () {

};

const put = function () {

};

const del = function () {

};

export {ajax, get, post, put, del};