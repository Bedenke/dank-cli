#!/usr/bin/env node

var main = require("../dist/index.js").default;

var args = process.argv.splice(process.execArgv.length + 2);

main(args);