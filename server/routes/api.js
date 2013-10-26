var express = require('express'),
  Media = require('../models/media');

var app = module.exports = express();

app.use(express.json());
app.get('/photos', photos);

function photos(req, res, next) {
  Media
    .find()
    .sort('-created_time')
    .skip(req.query.offset || 0)
    .limit(req.query.limit || 20)
    .exec(function (err, medias) {
      if (err) return next(err);
      res.send(medias);
    });
}