var nconf = require('nconf'),
  path = require('path');

var config = module.exports = nconf;

config.file({ file: path.resolve(__dirname + '/../../config/default.json') });

if (process.env.NODE_ENV === 'production')
  config.file({ file: path.join(__dirname, '/../../config/production.json') });