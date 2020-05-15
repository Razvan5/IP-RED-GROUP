var express = require('express');
var router = express.Router();
var path = require('path');
var http = require('http');
const rootPath = 'fiscaldocumentsapi.azurewebsites.net'

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/createReceipt.html'));
});

module.exports = router;
