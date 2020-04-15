"use strict";

const serverConstants = require('./serverConstants');
const requestTypes = require('./requestTypes');
const statusCodes = require('./statusCodes');
const fs = require('fs');

class requestHandler {
    static handleRequest(request, response, responseContentType) {
        switch (request.method) {
            case requestTypes.GET:
                return requestHandler.handleGETRequest(request, response, responseContentType);
            case requestTypes.POST:
                return requestHandler.handlePOSTRequest(request);
            default:
                return requestHandler.handleAJAXRequest(request);
        }
    }

    static handleGETRequest(request, response, responseContentType) {
        if (requestHandler.getPageContent(request.url, response, responseContentType))
            return;

        const ajaxRequestResult = requestHandler.handleAJAXRequest(request);
        if (!ajaxRequestResult)
            requestHandler.getNotFoundPageContent(response, responseContentType);
        return ajaxRequestResult;
    }

    static handlePOSTRequest(request) {
        requestHandler.handleAJAXRequest(request);
    }

    static handleAJAXRequest(request) {
        return false;
    }

    static getPageContent(pageName, response, responseContentType) {
        const pagePath = serverConstants.PAGES_DICTIONARY[pageName];
        if (pagePath === undefined)
            return false;

        fs.readFile(serverConstants.RESOURCES_FILE_PATH + pagePath, (err, data) => {
            response.writeHead(statusCodes.OK, responseContentType);
            response.end(data);
        });

        return true;
    }

    static getNotFoundPageContent(response, responseContentType) {
        fs.readFile(serverConstants.RESOURCES_FILE_PATH + serverConstants.NOT_FOUND_PAGE, (err, data) => {
            response.writeHead(statusCodes.OK, responseContentType);
            response.end(data);
        });
    }
}

module.exports = requestHandler;