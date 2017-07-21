/**
 * @author synder on 2017/3/19
 * @copyright
 * @desc
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = function (p) {
    return path.resolve(__dirname, p);
};

const plugins = function (htmlPath) {

    let htmlPlugins = [];

    let conf = {
        filename: 'index.html',
        template: htmlPath,
        inject: true,
    };

    htmlPlugins.push(new HtmlWebpackPlugin(conf));

    let otherPlugins = [];

    let vendor = new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'js/vendor/vendor.js',
        minChunks: function (module, count) {
            return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0;
        }
    });

    let manifest = new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: 'js/vendor/manifest.js',
        chunks: ['vendor']
    });

    let css = new ExtractTextPlugin({
        filename: 'css/[name].css'
    });

    let jquery = new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    });

    otherPlugins.push(vendor);
    otherPlugins.push(manifest);
    otherPlugins.push(css);
    otherPlugins.push(jquery);

    return htmlPlugins.concat(otherPlugins);
};

module.exports = {
    entry: {
        main: './view/main.js'
    },
    output: {
        path: resolve('./static'),
        publicPath: resolve('/'),
        filename: 'js/[name].js?[chunkhash]',
        chunkFilename: "js/chunk/chunk[id].js?[chunkhash]",
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            src: resolve('./view'),
            theme: 'element-ui/lib/theme-default/index.css',
            assets: resolve('./view/assets'),
            awesome: 'font-awesome/css/font-awesome.css',
            components: resolve('./view/components'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true,
                                        sourceMap: true
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),
                        less: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true,
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'less-loader',
                                    options:  {
                                        sourceMap: true
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        }),
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    filename: '[name].css',
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                    filename: '[name].css',
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('./src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'static/img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name:  'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: plugins('./view/index.html')
};
