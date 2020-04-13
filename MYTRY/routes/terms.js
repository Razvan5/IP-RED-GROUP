var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('terms', {});
});

router.get('/test', function (req, res, next) {
  res.redirect('/home');
});

module.exports = router;
