/// <binding BeforeBuild='Run - Development' />
var Path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    debug: true,
    devtool: "#source-map",
    entry: './js/app2.ts',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    output: {
        path: Path.join(__dirname),
        filename: '[name]-[hash:8].bundle.js'
    },
    plugins: [
      new WebpackNotifierPlugin(),
      new HtmlWebpackPlugin({
          template: Path.join(__dirname, 'js/index.html'),
          inject: 'span'
      }),
      new CleanWebpackPlugin(
          [
              "./main*.css",
              "./main*.css.map",
              "./*.bundle.js",
              "./*.bundle.js.map",
              "./index.html"
          ])
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/, loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/, loader: "url" },
            { test: /\.html$/, loader: "html" }
        ]
    }

};
