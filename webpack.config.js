/**
 * Created by safon on 21.08.17.
 */
'use strict';
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin  = require('copy-webpack-plugin');

var autoprefixer        = require('autoprefixer');
var postcssFontMagician = require('postcss-font-magician');


var path = require('path');
var NODE_EVN =  process.env.NODE_EVN || 'development';
var webpack = require('webpack');

module.exports = {
    context: __dirname + '/frontend',
    entry: {
        app: './app'
    },
    output: {
        path: __dirname + '/public/assets',
        filename: '[name].js',
        library: '[name]',
        chunkFilename: 'chunks/[chunkhash].js'
    },
    watch: NODE_EVN === 'development',

    watchOptions: {
      aggregateTimeout: 100
    },

    devtool: NODE_EVN === 'development' ? 'inline-source-map' : "eval-source-map",

    plugins: [
        new webpack.DefinePlugin({
            NODE_EVN: JSON.stringify(NODE_EVN),
            USER: JSON.stringify(process.env.USER),
            DEBUG: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.ProvidePlugin(
            {
                $               : 'jquery',
                jQuery          : 'jquery',
                'windows.jQuery': 'jquery'
            }
        ),
        new ExtractTextPlugin(
            '[name].css', {

                allChunks : true
            }
        ),
        // new HtmlWebpackPlugin(
        //     {
        //         template: '!html!public/index.html',
        //         filename: './index.html',
        //         hash    : true
        //     })
    ],

    resolveLoader: {
        modules: ["node_modules"],
        extensions: [" ",".js", ".json"],
        mainFields: ["loader", "main"],
        moduleExtensions: ['-loader']


    },
    resolve: {
        modules: [path.resolve('node_modules')],
        extensions: [' ', '.js']

    },

    module: {


        loaders: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: 'babel'
            },
            {
                test   : /\.html$/,
                loader: 'raw'
            },
            {
                test  : /\.css$/,
                loader: //ExtractTextPlugin.extract('style', 'css')
                'style!css'
            },
            {
                test  : /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!import-glob')
                // loader: ExtractTextPlugin.extract('style', 'css!sass!import-glob')
            },
            {
                test   : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    'url-loader?limit=10000&minetype=application/font-woff'
                ]
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!stylus?resolve url')
            },
            {
                test   : /\.(ttf|eot|svg|jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    'file?name=[ext]/[hash].[ext]?[hash]'
                ]
            },
            {
                test  : require.resolve('jquery'),
                loader: 'imports?jQuery=jquery'
            }
        ]
    },
    devServer : {
        contentBase       : 'public',
        port              : 2000,
        open              : true,
        historyApiFallback: true
    }

};

if(NODE_EVN === 'production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}