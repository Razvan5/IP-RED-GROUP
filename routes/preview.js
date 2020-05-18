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
        res.sendFile(path.join(__dirname, '../public/pages/preview.html'));
    } else {
        res.redirect('/login');
    }
});


router.get('/Receipt', function(req, res, next) {
    let body = '';
    var sessionCookie = getCookie(req.headers.cookie);
    console.log(sessionCookie);
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + sessionCookie.institutionName + '&documentID=' + sessionCookie.documentID;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: encodeURI('/Document/Retrieve.php' + params),
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


var getCookie = function(cookie) {
    if (!cookie) // if cookie is empty.
        return {};

    return cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
}
module.exports = router;