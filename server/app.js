var express = require('express'),
  path = require('path'),
  routes = require('./routes');

var app = module.exports = express();

app.use(express.compress());
app.use('/', express.static(path.resolve(__dirname, '/../public')));
app.use(routes);