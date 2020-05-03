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
        var form = document.getElementById("register-form");
        var xmlhttp = new XMLHttpRequest();

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var passwords={
                first:document.getElementById("registerPassword"),
                second:document.getElementById("psw-again")
            };

            if(passwords.first.value!=passwords.second.value){
                alert("PASSWORDS DO NOT MATCH");
            }else{
            var loginData = toJSONString(this);
            console.log(loginData);
            xmlhttp.open("POST", "/newAccount");
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
                    console.log(newData.responseStatus.error);

                        if(newData.responseStatus.error=="EMAIL_ALREADY_EXISTS")
                           alert("An account using this email already exists.");

                        else if(newData.responseStatus.error=="")
                            window.location.href = '/home';

                        else{
                             alert(JSON.stringify(newData));
                             }
                }
            };
         }

        }, false);

    });

})();