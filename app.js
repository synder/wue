/**
 * @author synder
 * @date 16/1/10
 * @desc create http server
 */

/**
 * @author synder
 * @date 16/1/10
 * @desc create http server
 */

const mo = require('module');
console.log(mo._load);

const fs = require('fs');
const webpack = require('webpack');
const body = require('body-parser');
const compression = require('compression');

const Server = require('./lib/server');
const error = require('./lib/error');

error.mount(global);

const WEBPACK = process.env.WEBPACK;

const server = new Server();

server.config('trust proxy', true);
server.config('x-powered-by', false);

const config = require('./webpack.js');
const webpackHot = require('./middleware/webpack/hot');
const webpackDev = require('./middleware/webpack/dev');

const compiler = webpack(config);

server.use(function (app) {
    app.use(compression());
    app.use(body.json());
    app.use(body.urlencoded({
        extended: true
    }));

    if(WEBPACK){
        app.use(webpackDev(compiler, config));
        app.use(webpackHot(compiler, config));
    }
});


let demo = require('./router/demo');

server.route(function (app) {
    demo.mount(app);
});

const errorHandler = require('./middleware/error/index');

server.error(function(app){
    app.use(errorHandler.notFoundHandler());
    app.use(errorHandler.serverErrorHandler());
});


module.exports = server;