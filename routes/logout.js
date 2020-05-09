var express = require('express');
var router = express.Router();
var path = require('path');
var http = require('http');
const rootPath = 'fiscaldocumentsapi.azurewebsites.net'

router.post('/', function (req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
