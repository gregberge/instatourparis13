var ig = require('../services/instagram'),
  config = require('../config');

function crawl() {
  ig.tag_media_recent(config.get('crawl:tag'), function (err, medias) {
    if (err) {
      console.error(err);
      setTimeout(crawl, 5000);
    }

    res.send(medias);
  });
}