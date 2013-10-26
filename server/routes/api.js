var express = require('express'),
  Media = require('../models/media');

var app = module.exports = express();

app.use(express.json());
app.get('/medias', list);
app.get('/medias/count', count);

function list(req, res, next) {
  Media
    .find()
    .sort('-created_time')
    .skip(req.query.skip || 0)
    .limit(req.query.limit || 20)
    .exec(function (err, medias) {
      if (err) return next(err);
      res.send(medias);
    });
}

function count(req, res, next) {
  Media.count(function (err, count) {
    if (err) return next(err);
    res.send({ count: count });
  });
}