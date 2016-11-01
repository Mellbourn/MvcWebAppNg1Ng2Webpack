/// <binding BeforeBuild='Run - Development' />
var Path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: Path.join(__dirname, 'js'),
    entry: './app2.ts',
    output: {
        path: Path.join(__dirname),
        filename: '[name]-[hash:8].bundle.js'
    },
    plugins: [
      new WebpackNotifierPlugin(),
      new HtmlWebpackPlugin({
          template: Path.join(__dirname, 'js/index.html'),
          inject: 'span',
          filename: Path.join(__dirname, 'index.html'),
      }),
      new CleanWebpackPlugin(
          [
              "./*.bundle.js",
              "./*.bundle.js.map",
              "./index.html"
          ])
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts" },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/, loader: "url" },
            { test: /\.html$/, loader: "html" }
        ]
    }

};
