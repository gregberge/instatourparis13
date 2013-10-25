var nconf = require('nconf'),
  path = require('path');

module.exports = nconf.file({ file: path.resolve(__dirname + '/../../config/default.json') });