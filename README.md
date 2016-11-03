# Lessons learnt from building MVC+ng1+ng2+webpack from scratch
## inspiration
Inspired by [Burke holland mvc5 with webpack and ng2](https://github.com/burkeholland/webpack-demo/tree/master/webpack-demo)

http://bitbucket.hm.com/projects/BPP/repos/pocmvcwebappng1ng2webpack/browse
## What to do
* Inject with HtmlWebpackPlugin using a tag, include that razor file using @Html.Raw(File.ReadAllText(Server.MapPath("~/index.html")))
* Use tsconfig.json
* Compile using webpack: { test: /\.ts$/, loader: "ts" },
## Problems that may occur (and their solution)
* Got console error Cannot find name 'Map'., Cannot find name 'Promise'., solution: npm install --save-dev @types/core-js
* error "Uncaught reflect-metadata shim is required when using class decorators" fixed by importing reflect-metadata
* console error "Uncaught ReferenceError: Zone is not defined" fixed by importing zone
* Angular 1.x not defined: import './vendor/angular';
* Consuming ng2 in ing1: don’t forget to provide in module
* Webpack error “Can't resolve ts, html” means that loaders are missing from package.json, eg. ts-loader, html-loader
* Duplicate identifier
* Clean out old builds
* Clean out typings
* webpack: error "Identifier 'angular' must be imported from a module" cured by "import * as angular from "angular";"
* Require is not defined - import @types/node AND include the file in visual studio
* Typescript sourcemaps fungerar inte
    * resolve: {
    *     extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    * },
* To get source maps from command line
    * devtool: "#source-map",
* För att hitta scss och html med relativa pather i componenter:
* TypeScriptiflerna:
*  test: /\.ts$/,
    *            loaders: [
    *                'awesome-typescript-loader',
    *                'angular2-template-loader'
    *            ]
* Tsconfig
  * "awesomeTypescriptLoaderOptions": {
  *   "forkChecker": true,
  *   "useWebpackText": true
  * }
* Externa scss i componenter
  *       test: /\.scss$/,
  *              exclude: /\index.scss$/,
  *              loaders: ['to-string', "css", "sass"]
* “require function is used in a way in which dependencies cannot be statically extracted” - doesn’t work with webpack, load from external site
* Assets not loading
* Make sure correct path
* loader: "url" },
* Use require when referring to pngs in text
* Testing: add webpack plugin to karma preprocessors
