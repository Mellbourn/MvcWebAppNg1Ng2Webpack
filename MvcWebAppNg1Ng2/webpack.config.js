var Path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: Path.join(__dirname, 'App'),
    entry: './main.js',
    output: {
        path: Path.join(__dirname, 'Built'),
        filename: '[name]-[hash:8].bundle.js'
    },
    plugins: [
      new WebpackNotifierPlugin(),
      new HtmlWebpackPlugin({
          template: Path.join(__dirname, 'App/index.html'),
          inject: 'span',
          filename: Path.join(__dirname, 'index.html'),
      })
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/, loader: "url" },
            { test: /\.html$/, loader: "html" }
        ]
    }

};
