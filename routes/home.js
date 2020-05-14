var express = require('express');
var router = express.Router();
const axios = require('axios');
const qs = require('qs');
const path = require('path');
var http = require('http');
const rootPath = 'fiscaldocumentsapi.azurewebsites.net'



router.get('/', function (req, res, next) {
  if (req.session.loggedIn === true) {
    console.log('Pass: ' + req.session.password);
    console.log('Email: ' + req.session.email);
    res.sendFile(path.join(__dirname, '../public/pages/Home.html'));
  } 
  else {
    res.redirect('/login');
  }
});




router.get('/getNewsFeed', function(req, res, next) {
  console.log(req.session.email);
  console.log(req.session.password);
  var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password+'&postsCount=20';
  console.log(params);
  var options = {
      hostname: rootPath,
      port: 80,
      path: '/Newsfeed/Retrieve.php' + params,
      method: 'GET',
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


router.post('/deleteNewsFeed', function(req, res, next) {

  let body = '';
  req.on('data', (chunk) => { // collect all data from client(browser)
      body += chunk;
  });
  req.on('end', () => { // when data (body component of http request) is collected
      var loginData = JSON.parse(body); //parse the body into JSON object
      // our path with parameters: email and hashedPassword.
      var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&postName='+loginData.postName;
      console.log(params);
      var options = {
          hostname: rootPath,
          port: 80,
          path: '/Newsfeed/Delete.php',
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


router.post('/postNews', function(req, res, next) {

    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&nameOfPost=' + loginData.newsFeedTitle +'&contentOfPost=' + loginData.newsFeedContent + '&linkOfPost=' + loginData.newsFeedLink +'&tagsOfPost=["';
        
        var value2=loginData.newsFeedTags.split(",");
        params+=value2[0]+'"';
        for(i=1;i<value2.length;i++){
            params+=',"'+value2[i]+'"';
        }
        params+=']';

        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Newsfeed/Create.php',
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