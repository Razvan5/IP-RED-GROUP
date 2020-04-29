var express = require('express');
var router = express.Router();
var path = require('path');
var http = require('http');
const rootPath = 'fiscaldocumentseditest.azurewebsites.net'

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/login.html'));
});

router.post('/', function (req, res, next) {
  let body = '';
  req.on('data', (chunk) => {        // collect all data from client(browser)
    body += chunk;
  });
  req.on('end', () => {              // when data (body component of http request) is collected
    var loginData = JSON.parse(body); //parse the body into JSON object
    console.log(loginData);

    // our path with parameters: email and hashedPassword.
    var parameterisedPath = '/Account/Login.php'+ '?email=' + loginData.email + '&hashedPassword=' + loginData.hashedPassword;

    var options = {
      hostname: rootPath,
      port: 80,
      path: parameterisedPath,
      method: 'POST'
    }

    const apiRequest = http.request(options, (apiResponse) =>{ // initiate request to api
      console.log(`statusCode: ${apiResponse.statusCode}`);

      var responseBody = '';
      apiResponse.on('data', (d) => {//collect all data
        responseBody = responseBody + d;
      });
      apiResponse.on('end', () => {   //when data is collected manage the response.

        responseBody = JSON.parse(responseBody);
        console.log(responseBody);
        // here we have to look at the responseStatus.status! TO DO
        res.json(responseBody); 
      });

      apiResponse.on('error', (error) => {//if we get error.
        console.error(error);
        res.send(error);
      });

    } );

    apiRequest.end();
  });
});
  module.exports = router;
