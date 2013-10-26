var express = require('express'),
  Media = require('../models/media');

var app = module.exports = express();

app.use(express.json());
app.get('/medias', list);
app.get('/medias/count', count);
app.get('/medias/:id', get);
app.get('/medias/:id/prev', prevMedia);
app.get('/medias/:id/next', nextMedia);
app.get('/medias/:id/rank', rank);

function list(req, res, next) {
  Media
    .find()
    .sort('-likes.count')
    .sort('-id')
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

function get(req, res, next) {
  Media
    .findOne({ id: req.params.id }, function (err, media) {
      if (err) return next(err);
      if (! media) return next(404);
      res.send(media);
    });
}

function prevMedia(req, res, next) {
  Media
    .findOne({ id: req.params.id }, function (err, media) {
      if (err) return next(err);
      if (! media) return next(404);

      Media
        .findOne({
          'likes.count': { $gte: media.likes.count },
          'id': { $ne: media.id }
        })
        .sort('likes.count')
        .sort('id')
        .exec(function (err, media) {
          if (err) return next(err);
          if (! media) return next(404);

          res.send(media);
        });
    });
}

function nextMedia(req, res, next) {
  Media
    .findOne({ id: req.params.id }, function (err, media) {
      if (err) return next(err);
      if (! media) return next(404);

      Media
        .findOne({
          'likes.count': { $lte: media.likes.count },
          'id': { $ne: media.id }
        })
        .sort('-likes.count')
        .sort('-id')
        .exec(function (err, media) {
          if (err) return next(err);
          if (! media) return next(404);

          res.send(media);
        });
    });
}

function rank(req, res, next) {
  Media
    .findOne({ id: req.params.id }, function (err, media) {
      if (err) return next(err);
      if (! media) return next(404);

      Media
        .count({
          'likes.count': { $gt: media.likes.count }
        }, function (err, count) {
          if (err) return next(err);
          res.send({ rank: count });
        });
    });
}