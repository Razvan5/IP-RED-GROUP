var express = require('express');
var router = express.Router();
const path = require('path');
var http = require('http');
const rootPath = 'fiscaldocumentseditest.azurewebsites.net'
router.get('/', function(req, res, next) {
    if (req.session.loggedIn === true) {
        console.log('Pass: ' + req.session.password);
        console.log('Email: ' + req.session.email);
        res.sendFile(path.join(__dirname, '../public/pages/institutionDashBoard.html'));
    } else {
        res.redirect('/login');
    }
});

router.post('/getInfo', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password + "&institutionName=" + loginData.institutionName;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: encodeURI('/Institution/Retrieve.php' + params),
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
});
router.get('/RetrieveAll', function(req, res, next) {
    var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionsPerPage=20&pageNumber=1&orderByAsc=1';
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

router.post('/', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName;
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Institution/Delete.php',
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