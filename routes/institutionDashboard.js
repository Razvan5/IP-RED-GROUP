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
        res.sendFile(path.join(__dirname, '../public/pages/institutionDashBoard.html'));
    } else {
        res.redirect('/login');
    }
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


router.get('/RetrieveYourInstitutions', function(req, res, next) {
    var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password;
    console.log(params);
    var options = {
        hostname: rootPath,
        port: 80,
        path: '/Institution/Member/RetrieveInstitutions.php' + params,
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





router.post('/institutionRetreieveRoles', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = '?email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: encodeURI('/Institution/Role/Retrieve.php' + params),
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






router.post('/', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName;
        console.log(params);
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



//crearea unui rol

router.post('/institutionCreateRole', function(req, res, next) {

    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName + '&roleName=' + loginData.roleName;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Institution/Role/Create.php',
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




router.post('/institutionModifyRole', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName + '&roleName=' + loginData.oldRole + '&newRoleName=' + loginData.newRole + '&newRoleRights={' +
            '"Can_Modify_Institution"' + ':' + loginData.Can_Modify_Institution + ',' +
            '"Can_Delete_Institution"' + ':' + loginData.Can_Delete_Institution + ',' +
            '"Can_Add_Members"' + ':' + loginData.Can_Add_Members + ',' +
            '"Can_Remove_Members"' + ':' + loginData.Can_Remove_Members + ',' +
            '"Can_Upload_Documents"' + ':' + loginData.Can_Upload_Documents + ',' +
            '"Can_Preview_Uploaded_Documents"' + ':' + loginData.Can_Preview_Uploaded_Documents + ',' +
            '"Can_Remove_Uploaded_Documents"' + ':' + loginData.Can_Remove_Uploaded_Documents + ',' +
            '"Can_Send_Documents"' + ':' + loginData.Can_Send_Documents + ',' +
            '"Can_Preview_Received_Documents"' + ':' + loginData.Can_Preview_Received_Documents + ',' +
            '"Can_Preview_Specific_Received_Document"' + ':' + loginData.Can_Preview_Specific_Received_Document + ',' +
            '"Can_Remove_Received_Documents"' + ':' + loginData.Can_Remove_Received_Documents + ',' +
            '"Can_Download_Documents"' + ':' + loginData.Can_Download_Documents + ',' +
            '"Can_Add_Roles"' + ':' + loginData.Can_Add_Roles + ',' +
            '"Can_Remove_Roles"' + ':' + loginData.Can_Remove_Roles + ',' +
            '"Can_Modify_Roles"' + ':' + loginData.Can_Modify_Roles + ',' +
            '"Can_Assign_Roles"' + ':' + loginData.Can_Assign_Roles + ',' +
            '"Can_Deassign_Roles"' + ':' + loginData.Can_Deassign_Roles + '}';

        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Institution/Role/Modify.php',
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

router.get('/getInstitutionMembers/:institutionName', function(req, res, next) {

    console.log(req.params);

    var parameters = '?email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + req.params.institutionName;
    console.log(parameters)
    var options = {
        hostname: rootPath,
        port: 80,
        path: encodeURI('/Institution/Member/Retrieve.php' + parameters),
        method: 'GET'
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
    apiRequest.end();

});


router.post('/roleDelete', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName + '&roleName=' + loginData.roleName;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Institution/Role/Delete.php',
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


router.post('/institutionAddMembers', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName + '&userIdentifier=' + loginData.email + '&roleName=' + loginData.roleName;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Institution/Member/Add.php',
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
router.post('/removeMember', function(req, res, next) {
    let body = '';
    req.on('data', (chunk) => { // collect all data from client(browser)
        body += chunk;
    });
    req.on('end', () => { // when data (body component of http request) is collected
        var loginData = JSON.parse(body); //parse the body into JSON object
        // our path with parameters: email and hashedPassword.
        var params = 'email=' + req.session.email + '&hashedPassword=' + req.session.password + '&institutionName=' + loginData.institutionName + '&memberEmail=' + loginData.memberEmail;
        console.log(params);
        var options = {
            hostname: rootPath,
            port: 80,
            path: '/Institution/Member/Remove.php',
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

//Razvan modify institution

router.post('/modify', function(req, res, next) {

    const institution = req.body.institution;
    console.log(institution);

    var object = [{
            Country: institution.address.country,
            Region: institution.address.region,
            City: institution.address.city,
            Street: institution.address.street,
            Number: institution.address.number,
            Building: institution.address.building,
            Floor: institution.address.floor,
            Apartment: institution.address.apartment,
            isMainAddress: 0
        },
        {
            Country: institution.address.country,
            Region: institution.address.region,
            City: institution.address.city,
            Street: institution.address.street,
            Number: institution.address.number,
            Building: institution.address.building,
            Floor: institution.address.floor,
            Apartment: 20,
            isMainAddress: 1
        }
    ];

    console.log("IMPORTANT" + object);
    console.log("IMPORTANT" + req.session.email);
    //console.log("IMPORTANT"+req.session.password);
    console.log("Nume:" + institution.oldName);
    console.log("Nume2" + institution.name);

    var json = JSON.stringify(object);
    console.log("IMPORTANTWOW" + json);
    axios({
            method: 'post',
            url: 'https://fiscaldocumentsapi.azurewebsites.net/Institution/Modify.php',
            data: qs.stringify({
                email: req.session.email,
                hashedPassword: req.session.password,
                institutionName: institution.oldName,
                newInstitutionName: institution.name,
                newInstitutionAddresses: json
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then(function(response) {
            return res.status(200).json({
                success: true
            });
        })
        .catch(function(error) {
            console.log(error);
        });



});
module.exports = router;