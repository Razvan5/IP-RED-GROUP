(function () {
    function toJSONString(form) {
        var obj = {};
        var elements = form.querySelectorAll("input");
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                obj[name] = value;
            }
        }
        return JSON.stringify(obj);
    }

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("login-form");
        var xmlhttp = new XMLHttpRequest();

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var loginData = toJSONString(this);
            console.log(loginData);
            xmlhttp.open("POST", "/login");
            xmlhttp.setRequestHeader("Content-Type", "application/javascript");
            xmlhttp.send(loginData);
            xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                console.log("ERROR");
            };
            xmlhttp.onload = function () {
                if (xmlhttp.status != 200) { 
                    alert(xmlhttp.responseText);
                }
                else {
                    var newData = JSON.parse(xmlhttp.responseText);

                    if(newData.responseStatus.error=="USER_NOT_FOUND"){
                        alert("USER NOT FOUND \n Please make sure you typed in your email and password correctly. \n OR \n If you don't have an account, please create one before logging in.");
                    }

                    else if(newData.responseStatus.error=="")
                        window.location.href = '/home';

                    else if(newData.responseStatus.error=="USER_INACTIVE")
                        alert("Your account is inactive.\n Please check you email to activate your account.");

                        else if(newData.responseStatus.error=="WRONG_PASSWORD")
                        alert("Wrong password. Please check your spelling.");

                    else{
                        alert(JSON.stringify(newData));
                        }
                }
            };

        }, false);

    });

})();