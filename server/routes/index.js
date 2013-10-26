var express = require('express'),
  cons = require('consolidate'),
  path = require('path'),
  _ = require('lodash'),
  api = require('./api');

var app = module.exports = express();

app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/../views'));

app.get('/', _.partial(renderPage, 'default'));
app.get('/photos', _.partial(renderPage, 'default'));
app.get('/photos/:id', _.partial(renderPage, 'default'));
app.use('/api', api);
app.use(show404);
app.use(error404Handler);
app.use(errorHandler);

function renderPage(page, req, res) {
  res.render('index', {
    partials: {
      page: 'pages/' + page
    }
  });
}

function show404(req, res, next) {
  next(404);
}

function error404Handler(err, req, res, next) {
  if (err !== 404) next(err);

  res.status(404);

  if (req.accepts('html')) return renderPage('404', req, res);
  if (req.accepts('json')) return res.send({ error: 'Not found' });
  res.type('txt').send('Not found');
}

function errorHandler(err, req, res) {
  res.status(500);

  if (req.accepts('html')) return renderPage('500', req, res);
  if (req.accepts('json')) return res.send({ error: 'Internal Server Error' });
  res.type('txt').send('Internal Server Error');
}