$(document).ready(function(){
    $('#wrapper').fullpage({
        scrollOverflow: true,
        autoScrolling:false,
    });
});
var myFullpage = new fullpage('#fullpage', {
    menu: '#menu',
    anchors: ['page1', 'page2', 'page3'],
    sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
    autoScrolling: false,
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
});