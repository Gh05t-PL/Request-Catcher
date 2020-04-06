var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('/', function(req, res, next) {
  if ( req.originalUrl.includes('favicon') ) {
    res.send('favicon is not being logged');
    return;
  }

  res.io.emit('request', {
    'httpVersion': req.httpVersion,
    'originalUrl': req.originalUrl,
    'method': req.method,
    'body': req.rawBody || "[EMPTY]",
    'headers': req.headers,
  });

  res.send(`Request catched!`);

  //req.method req.originalUrl req.httpVersion
});

module.exports = router;
