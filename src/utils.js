const fs = require('fs');
const getv = require('getv');
const minimist = require('minimist');
const rp = require('request-promise');

/**
 * Parses Process arguments into an object
 * @param {object} argv - Process arguments
 * @returns {object} settings object
 */
function parseArgs(argv) {
  const settings = minimist((argv), {
    string: ['f', 'u', 'y', 't', 'q'],
    boolean: ['p', 'o', 'i', 'x', 'h', 's'],
    alias: {
      f: 'file',
      u: 'url',
      q: 'query',
      p: 'paging',
      o: 'ordering',
      i: 'info',
      t: 'title',
      s: 'searching',
      y: 'scrollY',
      x: 'scrollX',
      h: 'help',
    },
    default: {
      p: true,
      o: true,
      i: true,
      s: true,
      t: 'Data Viewer',
      y: false,
      x: false,
      h: false,
    },
    '--': true,
    stopEarly: true,
  });

  settings.buttons = ['copy', 'csv', 'excel', 'pdf'];
  settings.colReorder = true;
  settings.fixedHeader = true;
  settings.scrollCollapse = settings.x || settings.y;
  settings.select = {
    style: 'multi',
  };

  return settings;
}

/**
 * Writes a file
 * @param {string} title - File purpose
 * @param {*} path - File path
 * @param {*} content - File content
 * @returns {Promise} promise
 */
function writeFile(title, path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        return reject(`File ${title} cannot be saved`);
      }

      return resolve();
    });
  });
}

/**
 * Parses data read from URL or file
 * @param {string} content -  URL or file content
 * @param {string} query - Path to array inside response object
 * @returns {object[]} Array of objects
 */
function parseData(content, query) {
  let data = content ? JSON.parse(content) : null;

  if (query && query !== 'undefined' && data && typeof data === 'object') {
    data = getv(data, query, []);
  }

  // response is a valid JSON:
  return Array.isArray(data) ? data : [];
}

/**
 * Reads data from URL or file
 * @param {string} file - File absolute path
 * @param {string} uri - URL
 * @param {string} query - Path to array inside response object
 * @returns {object[]} Array of objects
 */
function getData(file, uri, query) {
  if (file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) {
          return reject('Request data from file failed to complete');
        }

        return resolve(parseData(content, query));
      });
    });
  }

  return rp({
    uri,
  }).then(response => parseData(response, query))
    .catch(() => 'Request data from URL failed to complete');
}

module.exports = {
  getData,
  parseArgs,
  writeFile,
};
