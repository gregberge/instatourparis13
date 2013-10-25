var express = require('express');

var app = module.exports = express();

app.use(express.json());
app.get('/photos', photos);

function photos(req, res) {
  res.send({});
}