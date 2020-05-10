(function () {

    document.addEventListener("DOMContentLoaded", function () {
        var logoutButton = document.getElementById("logoutButton");
        var xmlhttp = new XMLHttpRequest();

        logoutButton.onclick = function (e) {
            e.preventDefault();
            var data = "Logout";
            xmlhttp.open("POST", "/logout");
            xmlhttp.setRequestHeader("Content-Type", "text/html");
            xmlhttp.send(data);
            xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                console.log("ERROR");
            };
            xmlhttp.onload = function () {
                if (xmlhttp.status != 200) { 
                    alert(xmlhttp.responseText);
                }
                else {
                    window.location.href = '/login';
                }
            };

        };

    });

})();