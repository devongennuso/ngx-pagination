'use strict';

var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'demo', 'src');
var production = -1 < process.argv.indexOf('--dist');
console.log('production', production);
var outPath = production ? 'dist' : 'build';
var devtool = production ? 'source-map' : 'eval-source-map';

var config = {
    target: 'web',
    cache: true,
    entry: {
        app: path.join(srcPath, 'bootstrap.ts'),
        common: [
            'es6-shim/es6-shim',
            'reflect-metadata/Reflect.js',
            'zone.js/dist/zone.js'
        ]
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ['node_modules'],
        alias: {}
    },
    output: {
        path: path.join(__dirname, 'demo', outPath),
        publicPath: '',
        filename: '[name].js',
        pathInfo: true
    },

    module: {
        noParse: [],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            { test: /\.css/, loader: 'raw' },
            { test: /\.scss/, loader: 'raw!sass' },
            { test: /\.html/, loader: 'html?-minimize' }
        ]
    },
    ts: {
        configFileName: 'tsconfig.demo.json'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: Infinity
        }),
        new webpack.NoErrorsPlugin()
    ],
    debug: true,
    devtool: devtool
};
if (production) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: false
    }));
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
}

module.exports = config;
