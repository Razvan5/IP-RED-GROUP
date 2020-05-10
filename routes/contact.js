var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', function(req, res, next) {
  if (req.session.loggedIn === true) {
    console.log('Pass: ' + req.session.password);
    console.log('Email: ' + req.session.email);
    res.sendFile(path.join(__dirname, '../public/pages/Contact.html'));
  } 
  else {
    res.redirect('/login');
  }
});

module.exports = router;
