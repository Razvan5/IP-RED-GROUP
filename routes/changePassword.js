var express = require('express'); 
var router = express.Router();
var path = require('path');
var http = require('http');
const rootPath = 'fiscaldocumentsapi.azurewebsites.net'
//-- initializare
router.get('/', function (req, res, next) { //2 parametrii : calea la care ascult daca am primit request-uri, cum tratez req
  res.sendFile(path.join(__dirname, '../public/pages/login.html'));
});

router.post('/', function (req, res, next) {
  var body = '';
  req.on('data', (chunk) => {        // collect all data from client(browser)
    body += chunk;
  });
  req.on('end', () => {              // when data (body component of http request) is collected
    var loginData = JSON.parse(body); //parse the body into JSON object
    console.log(loginData);

    // our path with parameters: email and hashedPassword.
    var params = 'email=' + loginData.email;
    console.log(params);
    var options = {
      hostname: rootPath,
      port: 80,
      path: '/Account/ChangePassword.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const apiRequest = http.request(options, (apiResponse) => { // initiate request to api
      console.log(`statusCode: ${apiResponse.statusCode}`);

      var responseBody = '';

      apiResponse.on('data', (d) => {//collect all data
        responseBody = responseBody + d;
      });
      apiResponse.on('end', () => {   //when data is collected manage the response.
        responseBody = JSON.parse(responseBody);
        if (responseBody.responseStatus.status === "FAILURE") {
          req.session.destroy();
          res.send(responseBody);
        } else {
          console.log(responseBody);
          req.session.email = loginData.email;
          // here we have to look at the responseStatus.status! TO DO
          res.json(responseBody);
        }
      });
      apiResponse.on('error', (error) => {//if we get error.
        console.error(error);
        res.send(error);
      });

    });
    apiRequest.write(params);
    apiRequest.end();
  });
});
module.exports = router;