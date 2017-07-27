/**
 * @author synder on 2017/3/19
 * @copyright
 * @desc
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = function (p) {
    return path.resolve(__dirname, p);
};

const plugins = function (htmlPath) {

    let temp = [];

    let env = new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    });

    let compress = new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            unused: true
        },
        except: ['$super', '$', 'exports', 'require']
    });
    
    
    let html = new HtmlWebpackPlugin({
        filename: 'index.html',
        template: htmlPath,
        inject: true,
        minify: {
            removeComments: true
        }
    });

    let css = new ExtractTextPlugin({
        filename: 'css/[name].css?[contenthash]',
        allChunks: true
    });
    
    temp.push(env);
    temp.push(compress);
    temp.push(html);
    temp.push(css);
    
    return temp;
};

module.exports = {
    entry: {
        main: './view/main.js',
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
                                    options: {
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
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: plugins('./view/index.html')
};
