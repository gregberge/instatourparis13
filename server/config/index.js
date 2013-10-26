var nconf = require('nconf');

module.exports = nconf
  .file('env', __dirname + '/../../config/' + process.env.NODE_ENV + '.json')
  .file(__dirname + '/../../config/default.json');