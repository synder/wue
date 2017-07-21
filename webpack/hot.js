/**
 * @author synder on 2017/3/24
 * @copyright
 * @desc
 */
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = function (compiler, webpackConfig) {
    
    const hotMiddleware = webpackHotMiddleware(compiler);

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' });
            cb();
        })
    });
    
    return hotMiddleware;
};
