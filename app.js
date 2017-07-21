/**
 * @author synder
 * @date 16/1/10
 * @desc create http server
 */

const express     = require('express');
const webpack = require('webpack');

const app = express();

//webpack================================
const config = require('./config');
const webpackHot = require('./webpack/hot');
const webpackDev = require('./webpack/dev');

const compiler = webpack(config);

app.use(webpackDev(compiler, config));
app.use(webpackHot(compiler, config));


app.use(express.static('./static'));

app.listen(3000);