var express = require('express'),
  path = require('path'),
  routes = require('./routes');

var app = module.exports = express();

app.use(express.compress());
app.use('/', express.static(path.join(__dirname, '/../client')));
app.use('/bower_components', express.static(path.join(__dirname, '/../bower_components')));
app.use(routes);