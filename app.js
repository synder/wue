/**
 * @author synder
 * @date 16/1/10
 * @desc create http server
 */

const express     = require('express');
const webpack = require('webpack');
const body = require('body-parser');
const compression    = require('compression');

const app = express();

//webpack================================
const config = require('./config');
const webpackHot = require('./webpack/hot');
const webpackDev = require('./webpack/dev');

const compiler = webpack(config);

app.use(compression());
app.use(webpackDev(compiler, config));
app.use(webpackHot(compiler, config));
app.use(body.json());
app.use(body.urlencoded({
    extended: true
}));

//ctrl====================================
const upload = require('./ctrl/upload');
const ajax = require('./ctrl/ajax');

app.post('/upload', upload.batch);
app.get('/ajax', ajax.get);
app.delete('/ajax', ajax.del);
app.post('/ajax', ajax.post);
app.put('/ajax', ajax.put);

app.use(express.static('./static'));

app.listen(3000);