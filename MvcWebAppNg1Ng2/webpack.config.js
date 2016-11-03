/// <binding BeforeBuild='Run - Development' />
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
        path: 'webpack_build',
        filename: '[name]-[hash:8].bundle.js'
    },
    plugins: [
      new WebpackNotifierPlugin(),
      new HtmlWebpackPlugin({
          template: 'js/index.html',
          inject: 'span',
          filename: '../webpack.html'
      }),
      new CleanWebpackPlugin(
          [
              "webpack.html",
              "webpack_build"
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
