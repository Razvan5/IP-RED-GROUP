"use strict";

class serverConstants {
    static RESOURCES_FILE_PATH = './../resources';

    static DEFAULT_ENCODING = 'UTF8';

    static PAGES_DICTIONARY = {
        '/': '/Main/login.html',
        '/Scripts/login.js': '/Main/Scripts/login.js',
        '/Scripts/fullpage.js': '/Main/Scripts/fullpage.js',
        '/Scripts/scrolloverflow.min.js': '/Main/Scripts/scrolloverflow.min.js',
        '/Style/fullpage.css': '/Main/Style/fullpage.css',
        '/Style/login.css': '/Main/Style/login.css',
        '/Misc/customer1.png': '/Main/Misc/customer1.png',
        '/Misc/customer2.jpg': '/Main/Misc/customer2.jpg',
        '/Misc/customer3.jpg': '/Main/Misc/customer3.jpg',
        '/Misc/customer4.jpg': '/Main/Misc/customer4.jpg',
        '/Misc/feature1.png': '/Main/Misc/feature1.png',
        '/Misc/feature2.png': '/Main/Misc/feature2.png',
        '/Misc/feature3.png': '/Main/Misc/feature3.png',
        '/Misc/feature4.png': '/Main/Misc/feature4.png',
        '/Misc/feature5.png': '/Main/Misc/feature5.png',
        '/Misc/feature6.png': '/Main/Misc/feature6.png',
        '/Misc/loginImage1.jpg': '/Main/Misc/loginImage1.jpg',
        '/Misc/loginImage2.jpg': '/Main/Misc/loginImage2.jpg',
        '/Misc/loginImage3.jpg': '/Main/Misc/loginImage3.jpg',
        '/Misc/logo.png': '/Main/Misc/logo.png'
    };
    static NOT_FOUND_PAGE = '/NotFound/notfound.html';
}

module.exports = serverConstants;