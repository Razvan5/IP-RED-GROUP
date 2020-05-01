var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn === true) {
    console.log('Pass: ' + req.session.password);
    console.log('Email: ' + req.session.email);
    res.send('respond with a resource');
  } 
  else {
    res.redirect('/login');
  }
});

module.exports = router;
