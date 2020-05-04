(function () {
    function toJSONString(form) {
        var obj = {};
        var elements = form.querySelectorAll("input");
        console.log(elements);
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

        var lNameForm = document.getElementById("lNameForm");
        var fNameForm = document.getElementById("fNameForm");
        var emailForm = document.getElementById("emailForm");
        var passwordForm = document.getElementById("passwordForm");
        var xmlhttp = new XMLHttpRequest();

        lNameForm.addEventListener("submit", function (e) {
            let editLName = lNameForm.querySelector("#editLName");
            e.preventDefault();

            if (editLName.value === "Edit") {
                console.log(editLName);
                var modifiedData = toJSONString(this);
                xmlhttp.open("POST", "/accountDashboard/modifyData");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(modifiedData);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };
                xmlhttp.onload = function () {
                    alert(xmlhttp.responseText);
                };

            } else {
                console.log("not yet");
            }
        }, false);

        fNameForm.addEventListener("submit", function (e) {
            let editFName = fNameForm.querySelector("#editFName");
            e.preventDefault();
            if (editFName.value === 'Edit') {
                console.log(editFName);

                var modifiedData = toJSONString(this);
                console.log(modifiedData);
                xmlhttp.open("POST", "/accountDashboard/modifyData");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(modifiedData);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };
                xmlhttp.onload = function () {
                    alert(xmlhttp.responseText);
                };
            } else {
                console.log("not yet");
            }
        }, false);

        emailForm.addEventListener("submit", function (e) {
            let editEmail = emailForm.querySelector("#editEmail");
            e.preventDefault();
            if (editEmail.value === 'Edit') {
                console.log(editEmail);

                var modifiedData = toJSONString(this);
                xmlhttp.open("POST", "/accountDashboard/modifyData");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(modifiedData);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };
                xmlhttp.onload = function () {
                    alert(xmlhttp.responseText);
                };
            } else {
                console.log("not yet");
            }
        }, false);

        passwordForm.addEventListener("submit", function (e) {
            let editPassword = passwordForm.querySelector("#editPassword");
            e.preventDefault();
            console.log(editPassword.value);
            if (editPassword.value === 'Edit') {
                console.log(editPassword);
                var modifiedData = toJSONString(this);
                xmlhttp.open("POST", "/accountDashboard/modifyData");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(modifiedData);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };
                xmlhttp.onload = function () {
                    alert(xmlhttp.responseText);
                };
            } else {
                console.log("not yet");
            }
        }, false);


    });

})();