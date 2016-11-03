# Lessons learnt from building MVC+ng1+ng2+webpack from scratch
## inspiration
Inspired by [Burke holland mvc5 with webpack and ng2](https://github.com/burkeholland/webpack-demo/tree/master/webpack-demo)

http://bitbucket.hm.com/projects/BPP/repos/pocmvcwebappng1ng2webpack/browse
## What to do
* Inject with HtmlWebpackPlugin using a tag, include that razor file using `@Html.Raw(File.ReadAllText(Server.MapPath("~/index.html")))`
* Use `tsconfig.json`
* Compile using webpack: `{ test: /\.ts$/, loader: "ts" }` (but see below for better loader)
## Problems that may occur (and their solution)
* Got `console error Cannot find name 'Map'., Cannot find name 'Promise'`., solution: `npm install --save-dev @types/core-js`
* error `Uncaught reflect-metadata shim is required when using class decorators` fixed by importing `reflect-metadata`
* console error `Uncaught ReferenceError: Zone is not defined` fixed by importing `zone`
* `Angular 1.x not defined`: `import './vendor/angular';`
* Consuming ng2 in ing1: don’t forget to provide in module
* Webpack error `Can't resolve ts` means that loaders are missing from `package.json`, eg. `ts-loader`, `html-loader`
* Duplicate identifier
* Clean out old builds
* Clean out typings
* webpack: `Identifier 'angular' must be imported from a module` cured by `import * as angular from "angular";`
* `Require is not defined` - `import @types/node` AND include the file in visual studio
* Typescript sourcemaps not working
```js
     resolve: {
         extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
     },
```
* To get source maps from command line
```js
     devtool: "#source-map",
```
* to enable relative paths in components:
    1 TypeScriptiflerna:
```js
  test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
```
    2 Tsconfig
```js
   "awesomeTypescriptLoaderOptions": {
     "forkChecker": true,
     "useWebpackText": true
   }
```
    3 external SASS in components
```js
         test: /\.scss$/,
                exclude: /\index.scss$/,
                loaders: ['to-string', "css", "sass"]
```
* `require function is used in a way in which dependencies cannot be statically extracted` - doesn’t work with webpack, load from external site
* Assets not loading: Make sure correct path and `loader: "url"`
* You can use require when referring to pngs in text
* Testing: add `karma-webpack` plugin to karma preprocessors
