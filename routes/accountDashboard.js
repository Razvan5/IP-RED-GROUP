var express = require('express');
var http = require('http');
var router = express.Router();
const path = require('path');
const rootPath = 'fiscaldocumentsapi.azurewebsites.net';

router.get('/', function (req, res, next) {
  if (req.session.loggedIn === true) {
    console.log('Pass: ' + req.session.password);
    console.log('Email: ' + req.session.email);
    res.sendFile(path.join(__dirname, '../public/pages/accountDashBoard.html'));
  }
  else {
    res.redirect('/login');
  }
});

router.post('/modifyData', function (req, res, next) {
  let body = '';
  req.on('data', (chunk) => { // collect all data from client(browser)
    body += chunk;
  });
  req.on('end', () => { // when data (body component of http request) is collected
    var loginData = JSON.parse(body); //parse the body into JSON object
    let modifyData = {};
    modifyData.email = req.session.email;
    modifyData.password = req.session.password;
    modifyData.newPassword = loginData.password;
    modifyData.newLName = loginData.lName;
    modifyData.newFName = loginData.fName;

    if (!modifyData.newPassword) {
      modifyData.newPassword = req.session.password;
    }

    var params =
      'email=' + modifyData.email +
      '&currentHashedPassword=' + modifyData.password +
      "&newHashedPassword=" + modifyData.newPassword +
      "&newFirstName=" + modifyData.newFName +
      "&newLastName=" + modifyData.newLName;

    console.log(params);
    var options = {
      hostname: rootPath,
      port: 80,
      path: '/Account/Modify.php',
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
          res.send(responseBody);
        } else {
          if(loginData.password){
            console.log("Bunica");
          req.session.password = loginData.password;
          }
          console.log(responseBody);
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
