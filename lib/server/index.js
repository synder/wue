/**
 * @author synder on 2017/8/4
 * @copyright
 * @desc
 */

const events = require('events');
const express = require('express');

class Server extends events.EventEmitter{
    
    constructor(port = 8000, host){
        super();
        
        this.host = host;
        this.port = port;
        this.static = express.static;
        this.app = express();
    }

    config(key, value){
        if(arguments.length > 1){
            this.app.set(key, value);
            return this;
        }else{
            return this.app.get(key);
        }
    }

    use(fn){
        fn(this.app);
    }

    route(fn){
        fn(this.app);
    }

    error(fn){
        fn(this.app);
    }

    listen(callback){
        this.app.listen(this.port, this.host, function (err) {
            if (err) {
                return callback(err);
            }
            callback && callback(this.host || '127.0.0.1' + ':' + this.port);
        }.bind(this));
    }
}

module.exports = Server;