"use strict";

class contentTypePerExtension {
    static DEFAULT_CONTENT_TYPE = 'text/html';
    static CONTENT_TYPE_DICTIONARY = {
        '.html': 'text/html',
        '.htm': 'text/html',
        '.php': 'application/php',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.bmp': 'image/bmp',
        '.gif': 'image/gif',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.mpeg': 'video/mpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg'
    };
}

module.exports = contentTypePerExtension;