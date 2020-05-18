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
    res.sendFile(path.join(__dirname, '../public/pages/sendDocuments.html'));
  }
  else {
    res.redirect('/login');
  }
});


router.get('/retrieveUserCreatedDocs', function(req, res, next) {
    var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password;
    console.log(params);
    var options = {
        hostname: rootPath,
        port: 80,
        path: '/Document/Filters/UserCreated.php' + params,
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



router.get('/RetrieveAll', function(req, res, next) {
    var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionsPerPage=40&pageNumber=1&orderByAsc=1';
    console.log(params);
    var options = {
        hostname: rootPath,
        port: 80,
        path: '/Institution/RetrieveAll.php' + params,
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


router.post('/sendThatDocument', function(req, res, next) {

    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&senderInstitutionName=' + loginData.senderInstitutionName + '&documentID=' + loginData.documentID+'&receiverInstitutionID='+loginData.receiverInstitutionID;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Document/Send.php',
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

router.post('/deleteDocument', function(req, res) {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', () => {
        const bodyObject = JSON.parse(body)
        const institutionName = bodyObject.institutionName
        const documentID = bodyObject.documentID

        const options = {
            hostname: rootPath,
            port: 80,
            path: 'http://fiscaldocumentsapi.azurewebsites.net/Account/ChangePassword.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const apiRequest = http.request(options, (apiResponse) => {
            let apiResponseBody = ''
            apiResponse.on('data', (d) => {
                apiResponseBody += d
            })
            apiResponse.on('end', () => {
                res.send(apiResponseBody)
            })
            apiResponse.on('error', () => {
                res.send(error)
                console.log(error)
            })
        })

        apiRequest.write('email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + institutionName + '&documentID=' + documentID)
        apiRequest.end()
    })
})

module.exports = router;
