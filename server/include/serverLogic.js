"use strict";

const contentTypePerExtension = require('./contentTypePerExtension');
const requestHandler = require('./requestHandler');
const http = require('http');

class serverLogic {
    static initialize(port) {
        const httpServer = http.createServer(function(request, response) {
            const requestedPagePath = request.url;
            const fileExtension = requestedPagePath.substring(requestedPagePath.lastIndexOf('.'));
            let responseContentTypeValue = contentTypePerExtension.CONTENT_TYPE_DICTIONARY[fileExtension];
            if (responseContentTypeValue === undefined)
                responseContentTypeValue = contentTypePerExtension.DEFAULT_CONTENT_TYPE;

            const responseContentType = {
                'Content-Type': responseContentTypeValue
            };

            requestHandler.handleRequest(request, response, responseContentType);
        });
        httpServer.listen(port);

        return httpServer;
    }
}

module.exports = serverLogic;