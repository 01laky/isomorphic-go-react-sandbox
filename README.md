
# isomorphic-go-react-sandbox
This project contains a sandbox based on **Facebook React** with **Golang** server side render and also with a set of useful
features for rapid development of efficient applications.

## Containing packages
server side render via [go-duktape](https://github.com/olebedev/go-duktape)<br />
api requests between your react application and server side application directly  via [fetch polyfill](https://github.com/olebedev/go-duktape-fetch) for go-duktape at server side, and it is possible to process requests with user session as well<br />
title, Open Graph and other domain-specific meta tags render for each page at the server and at the client<br />
server side redirect<br />
embedding static files into artefact via bindata<br />
high performance [echo](https://github.com/labstack/echo) framework<br />
advanced cli via [cli](https://github.com/codegangsta/cli)<br />
Makefile based project<br />
one(!) terminal window process for development<br />
routing via [react-router](https://github.com/reactjs/react-router)<br />
ES6 & JSX via [babel-loader](https://github.com/babel/babel-loader) with minimal runtime dependency footprint<br />
[redux](https://rackt.org/redux/) as state container<br />
[redux-devtools](https://github.com/gaearon/redux-devtools)<br />
css styles without global namespace via PostCSS, [css-loader](https://github.com/webpack/css-loader) & css-modules<br />
separate css file to avoid FOUC<br />
hot reloading via [react-transform](https://github.com/gaearon/babel-plugin-react-transform) & [HMR](http://webpack.github.io/docs/hot-module-replacement.html)<br />
webpack bundle builder<br />
eslint and golint rules for Makefile<br />

## Dependencies
[golang](https://golang.org/)<br />
[node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/), only to build the application bundle at compile time<br />
[GNU make](https://www.gnu.org/software/make/)<br />

## Project structure

server<br />
├── config <-- Base config maker package<br />
├── controller <-- prebuild controller package<br />
│   └── user.go<br />
├── logger <-- prebuild logger package<br />
│   └── requestErrorLogger.go<br />
├── model <-- prebuild model package<br />
│   │── config.json<br />
│   │── connection.go<br />
│   └── user.go<br />
├── api.go<br />
├── app.go<br />
├── bindata.go <-- this file is gitignored, it will appear at compile time<br />
├── conf.go<br />
├── data<br />
│   └── templates<br />
│       └── react.html<br />
├── main.go <-- main function declared here<br />
├── react.go<br />
└── utils.go<br />

client<br />
├── actions.js<br />
├── components<br />
│   ├── app<br />
│   │   ├── favicon.ico<br />
│   │   ├── index.js<br />
│   │   └── styles.css<br />
│   ├── homepage<br />
│   │   ├── index.js<br />
│   │   └── styles.css<br />
│   ├── not-found<br />
│   │   ├── index.js<br />
│   │   └── styles.css<br />
│   └── usage<br />
│       ├── index.js<br />
│       └── styles.css<br />
├── css<br />
│   ├── funcs.js<br />
│   ├── global.css<br />
│   ├── index.js<br />
│   └── vars.js<br />
├── index.js <-- main function declared here<br />
├── reducers.js<br />
├── router<br />
│   ├── index.js<br />
│   ├── routes.js<br />
│   └── toString.js<br />
└── store.js<br />
The client app will be compiled into `server/data/static/build/`.  Then it will be embedded into go package via _go-bindata_. After that the package will be compiled into binary.

## Install

Clone:

git clone git@github.com:01laky/isomorphic-go-react-sandbox.git $GOPATH/src/github.com/<username>/<project>
cd $GOPATH/src/github.com/<username>/<project>

JavaScript dependencies:
npm i
Install Golang dependencies via revision locking tool - [srlt](https://github.com/olebedev/srlt). Make sure that you have srlt installed, environment variable `GO15VENDOREXPERIMENT=1` and _Golang_ >= 1.5.0.<br />
srlt restore<br />
make install<br />

## Run development

make serve

that's it. Open [http://localhost:5001/](http://localhost:5001/)(if you use default port) at your browser. Now you ready to start coding your awesome project.<br />
Install dependencies and type `NODE_ENV=production make build`. This rule is producing webpack build and regular golang build after that. Result you can find at `$GOPATH/bin`. Note that the binary will be named **as the current project <br />


















