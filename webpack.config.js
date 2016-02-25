'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

console.log(NODE_ENV);

module.exports = {
    entry: './js/mail-app',
    output: {
        filename: 'bundle.js'
    },

    watch: NODE_ENV === "development",

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],

    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'ng-cache'
        }, {
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
        }]
    }
};