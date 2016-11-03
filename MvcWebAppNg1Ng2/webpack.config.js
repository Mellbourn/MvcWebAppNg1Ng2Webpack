/// <binding BeforeBuild='Run - Development' />
var webpack = require("webpack");
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
    devtool: "#source-map",
    entry: {
        main: './js/app2.ts',
        vendors: ['./js/vendor.ts']
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: 'webpack_build',
        filename: '[name]-[chunkhash:6].bundle.js'
    },
    plugins: [
      new WebpackNotifierPlugin(),
      new HtmlWebpackPlugin({
          template: 'js/index.html',
          inject: 'span',
          filename: '../webpack.html'
      }),
      new webpack.optimize.CommonsChunkPlugin({
          names: ["vendors", "manifest"]
      }),
      new CleanWebpackPlugin(
          [
              "webpack.html",
              "webpack_build"
          ]),
          // https://github.com/angular/angular/issues/11580
          new ContextReplacementPlugin(
              /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
              'js' // location of your src
              )
    ],
    module: {
        rules: [
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
