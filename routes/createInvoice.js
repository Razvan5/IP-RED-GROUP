var express = require('express');
var router = express.Router();
const axios = require('axios');
const qs = require('qs');
const path = require('path');
var http = require('http');
const rootPath = 'fiscaldocumentsapi.azurewebsites.net';
router.get('/', function(req, res, next) {
    if (req.session.loggedIn === true) {
        console.log('Pass: ' + req.session.password);
        console.log('Email: ' + req.session.email);
        res.sendFile(path.join(__dirname, '../public/pages/createInvoice.html'));
    } else {
        res.redirect('/login');
    }
});



router.post('/uploadInvoice', function(req, res, next) {

  let body = '';
  req.on('data', (chunk) => { // collect all data from client(browser)
      body += chunk;
  });
  req.on('end', () => { // when data (body component of http request) is collected
      var loginData = JSON.parse(body); //parse the body into JSON object
      // our path with parameters: email and hashedPassword.
      var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&creatorUserEmail=' +req.session.email + '&institutionName=' + loginData.institutionName + '&documentItems=[';
      for(i=0;i<loginData.documentItems.length;i++)
      {
        params=params+'{'+
        '"currencyTitle"'+ ':' +'"'+loginData.documentItems[i].currencyTitle+'",'+
        '"productNumber"'+ ':' +loginData.documentItems[i].productNumber+','+
        '"title"'+ ':' +'"'+loginData.documentItems[i].title+'",'+
        '"description"'+ ':' +'"'+loginData.documentItems[i].description+'",'+
        '"valueBeforeTax"'+ ':' +loginData.documentItems[i].valueBeforeTax+','+
        '"taxPercentage"'+ ':' +loginData.documentItems[i].taxPercentage+','+
        '"quantity"'+ ':' +loginData.documentItems[i].quantity+'}'
        if(i<loginData.documentItems.length-1)
        params=params+',';
      }
      params=params+']';
      console.log(params);
      var options = {
          hostname: rootPath,
          port: 80,
          path:'/Document/UploadInvoice.php',
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      }

      const apiRequest = http.request(options, (apiResponse) => { // initiate request to api
          console.log(`statusCode: ${apiResponse.statusCode}`);

          var responseBody = '';
          apiResponse.on('data', (d) => { //collect all data
              responseBody = responseBody + d;
          });
          apiResponse.on('end', () => { //when data is collected manage the response.
              console.log(responseBody);
              res.send(responseBody);
          });
          apiResponse.on('error', (error) => { //if we get error.
              console.error(error);
              res.send(error);
          });

      });
      apiRequest.write(params);
      apiRequest.end();
  });
});


module.exports = router;
