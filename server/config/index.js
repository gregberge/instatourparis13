var nconf = require('nconf'),
  path = require('path');

module.exports = nconf
  .file({ file: path.resolve(__dirname + '/../../config/default.json') })
  .file('production', { file: path.join(__dirname, '/../../config/' + process.env.NODE_ENV + '.json') });