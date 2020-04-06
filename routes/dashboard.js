var express = require('express');
var router = express.Router();

function isNgrok(headers) {
  return headers.host.toLowerCase().includes('ngrok');
}

/* GET home page. */
router.all('/', function(req, res, next) {
  if ( isNgrok(req.headers) ) {
    res.send('');
    return;
  }

  res.render('dashboard', { title: 'Express' });
});

module.exports = router;
