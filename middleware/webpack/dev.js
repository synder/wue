/**
 * @author synder on 2017/3/24
 * @copyright
 * @desc
 */

const webpackDevMiddleware = require('webpack-dev-middleware');


module.exports = function (compiler, webpackConfig) {
    return webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: false
    });
};