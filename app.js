#!/usr/bin/env node

const openurl = require('openurl');
const path = require('path');
const utils = require('./src/utils');

const args = utils.parseArgs(process.argv.slice(2));

if (args.help) {
  console.log(`
Usage:
    dv [options]

Options:
    -f PATH, --file PATH              absolute path of json file
    -u URL, --url URL                 url of online json file
    [-q PATH, --query]                specify path to an array inside response object
    [-p BOOL, --paging BOOL]          toggle table paging (default: true)
    [-o BOOL, --ordering BOOL]        toggle table ordering (default: true)
    [-i BOOL, --info BOOL]            toggle table information (default: true)
    [-s BOOL, --searching BOOL]       toggle table search (default: true)
    [-x BOOL, --scrollX BOOL]         enable horizontal scrolling (default: false)
    [-y HEIGHT, --scrollY HEIGHT]     enable vertical scrolling and set table max height (default: false)
    [-t TITLE, --title TITLE]         set results page title
    [-h, --help]                      display help
`);
}
else if (!args.file && !args.url) {
  console.error('at least one of the following arguments are mandatory: --file, --url');
}
else {
  utils.writeFile('settings', path.resolve('./src/settings.js'), `const settings = ${JSON.stringify(args)};`)
    .then(() => utils.writeFile('title', path.resolve('./src/title.js'), `document.title = '${args.title}';`))
    .then(() => utils.getData(args.file, args.url, args.query))
    .then(data => utils.writeFile('data', path.resolve('./src/data.js'), `const data = ${JSON.stringify(data)};`))
    .then(() => openurl.open(path.resolve('./src/index.html')))
    .catch((err) => {
      console.error(err);
    });
}
