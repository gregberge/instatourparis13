var express = require('express'),
  async = require('async'),
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
    .sort({
      'likes.count': -1,
      'id': -1
    })
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
  async.waterfall([
    computeRank.bind(null, req.params.id),
    function (rank, cb) {
      if (! rank) return cb();

      Media
        .findOne()
        .sort({
          'likes.count': -1,
          'id': -1
        })
        .skip(rank - 1)
        .limit(1)
        .exec(cb);
    }
  ], function (err, media) {
    if (err) return next(err);
    if (! media) return next(404);

    res.send(media);
  });
}

function nextMedia(req, res, next) {
  async.waterfall([
    computeRank.bind(null, req.params.id),
    function (rank, cb) {
      Media
        .findOne()
        .sort({
          'likes.count': -1,
          'id': -1
        })
        .skip(rank + 1)
        .limit(1)
        .exec(cb);
    }
  ], function (err, media) {
    if (err) return next(err);
    if (! media) return next(404);

    res.send(media);
  });
}

function rank(req, res, next) {
  computeRank(req.params.id, function (err, rank) {
    if (err) return next(err);
    res.send({ rank: rank });
  });
}

function computeRank(id, callback) {
  var _media, _count;

  async.waterfall([
    function (cb) {
      Media.findOne({ id: id }, cb);
    },
    function (media, cb) {
      _media = media;
      Media
        .count({
          'likes.count': { $gt: _media.likes.count }
        }, cb);
    },
    function (count, cb) {
      _count = count;
      Media
        .count({
          'likes.count': _media.likes.count,
          'id': { $gt: _media.id }
        }, cb);
    }
  ], function (err, count) {
    if (err) return callback(err);
    callback(null, _count + count);
  });
}