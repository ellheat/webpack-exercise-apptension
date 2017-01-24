'use strict';
var webpack = require("webpack");
var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: {
        'main': './src/main.js',
        'unsupported': './src/unsupported.js'
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.styl$/, loaders: [
                'style',
                'css',
                'stylus'
            ]},
            {test: /\.png$/, loaders: [
                'file?name=i/[hash].[ext]'
            ]}
        ]
    },
    resolve: {
        modulesDirectories: ["web_modules", "node_modules", "spritesmith-generated"]
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/ico'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
                css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        })
    ]
};
