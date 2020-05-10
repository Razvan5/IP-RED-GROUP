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






var modifyRoleForm = document.getElementById("modifyRoleForm");
var createRoleForm =document.getElementById("createRoleForm");
var listInstitution = document.getElementsByClassName("institutionList");

function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function getMembers(institutionName, callback ) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "institutionDashboard/getInstitutionMembers/" + institutionName);
    xmlhttp.send("data");
    xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
        console.log("ERROR");
    };
    xmlhttp.onload = function () {
        if (xmlhttp.status != 200) {
            callback({});
        } else {
            console.log('RESPONSE: members info: ' + xmlhttp.responseText);
            var newJson = JSON.parse(xmlhttp.responseText);
            callback(newJson.returnedObject)
        }
    };
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {

    if (event.target.matches('.stergeAsta')) {
        var target = event.target;
        var roleP = document.getElementById(target.parentNode.id);
        var roleParagraf = roleP.getElementsByTagName("p");
        var roleParent = document.getElementById(roleP.parentNode.parentNode.id);
        var spans = roleParent.getElementsByTagName("span");
        var xmlhttp = new XMLHttpRequest();
        let data = { institutionName: spans[0].innerText, roleName: roleParagraf[0].innerText };
        var myJSON = JSON.stringify(data);
        data = myJSON;
        xmlhttp.open("POST", "/institutionDashboard/roleDelete");
        xmlhttp.setRequestHeader("Content-Type", "application/javascript");
        xmlhttp.send(data);
        xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
            console.log("ERROR");
        };
        xmlhttp.onload = function() {
            if (xmlhttp.status != 200) {
                alert("NOT WORKING");
            } else {
                console.log(xmlhttp.responseText);
                var newJson = JSON.parse(xmlhttp.responseText);
                if (newJson.responseStatus.status === "SUCCESS") {
                    if (roleP.parentNode) {
                        roleP.parentNode.removeChild(roleP);
                    }
                } else {
                    alert(newJson.responseStatus.error);
                }
            }
        };


    } else if (event.target.matches('.dropdown-element')) {
        var target = event.target;
        if (target.innerText == "Delete") {
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var divparent = document.getElementById(target.parentNode.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            //  alert(spans[0].innerText);
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            var xmlhttp = new XMLHttpRequest();
            let data = { institutionName: spans[0].innerText };
            var myJSON = JSON.stringify(data);
            data = myJSON;
            xmlhttp.open("POST", "/institutionDashboard");
            xmlhttp.setRequestHeader("Content-Type", "application/javascript");
            xmlhttp.send(data);
            xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                console.log("ERROR");
            };
            xmlhttp.onload = function () {
                if (xmlhttp.status != 200) {
                    alert("NOT WORKING");
                } else {
                    console.log(xmlhttp.responseText);
                    var newJson = JSON.parse(xmlhttp.responseText);
                    if (newJson.responseStatus.status === "SUCCESS") {
                        if (div.parentNode) {
                            divparent.parentNode.removeChild(divparent);
                        }
                    } else {
                        alert(newJson.responseStatus.error);
                    }
                }
            };


        } else if (target.innerText == "Create Role") {
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            createRoleForm.institutionName.value = spans[0].innerText;
            var createRoleWrapper = document.getElementById("createRoleWrapper");
            createRoleWrapper.style.display = "flex";


            var createRoleCancelButton = document.getElementById("createRoleCancelButton");
            createRoleCancelButton.addEventListener("click", function() {
                createRoleWrapper.style.display = "none";
            });

            


            createRoleForm.addEventListener("submit",f,false);
            
            function  f(e) {
                e.preventDefault();
                createRoleWrapper.style.display = "none";

                createRoleForm = document.getElementById("createRoleForm");
                var loginData = toJSONString(createRoleForm);
                console.log(loginData);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/institutionDashboard/institutionCreateRole");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(loginData);
                xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };

                xmlhttp.onload = function() {
                    if (xmlhttp.status != 200) {
                        alert(xmlhttp.responseText);
                    } else {
                        var newData = JSON.parse(xmlhttp.responseText);
                        console.log(newData.responseStatus.error);

                        if(newData.responseStatus.error=="")
                        alert("Role created");

                        else if(newData.responseStatus.error=="DUPLICATE_ROLE")
                        alert("DUPLICATE ROLE");

                        else if(newData.responseStatus.error=="ROLE_DUPLICATE_SAME_RIGHTS")
                        alert("REDUNDANT ROLE: THE ROLE YOU ARE TRYING TO CREATE\n HAS THE SAME RIGHTS AS AN ALREADY EXISTING ROLE");

                        else if(newData.responseStatus.error=="WRONG_PASSWORD")
                        alert("WRONG PASSWORD. PLEASE MAKE SURE YOU TYPED YOUR PASSWORD CORRECTLY");

                        else if(newData.responseStatus.error=="USER_NOT_FOUND")
                        alert("USER NOT FOUND. PLEASE MAKE SURE YOU TYPED YOUR E-MAIL ADDRESS CORRECTLY");

                        else{
                        alert(JSON.stringify(newData));
                        }
                    }
                };

               createRoleForm.removeEventListener("submit",f);
            }

        } else if (target.innerText == "Modify Role") {
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            modifyRoleForm.institutionName.value = spans[0].innerText;
            var modifyRoleWrapper = document.getElementById("modifyRoleWrapper");
            modifyRoleWrapper.style.display = "flex";


            var cancelButton = document.getElementById("cancelButton");
            cancelButton.addEventListener("click", function () {
                modifyRoleWrapper.style.display = "none";
                window.location.href = '/institutionDashBoard';

            });




            modifyRoleForm.addEventListener("submit",g, false);
            
            function g(e) {
                e.preventDefault();
                modifyRoleWrapper.style.display = "none";
                var checkboxes = document.getElementsByClassName("rightsInput");
                for (i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked == true)
                        checkboxes[i].value = "1";
                    else
                        checkboxes[i].value = "0";
                }

                modifyRoleForm = document.getElementById("modifyRoleForm");
                var loginData = toJSONString(modifyRoleForm);
                console.log(loginData);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/institutionDashboard/institutionModifyRole");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(loginData);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };

                console.log("HELLO")
                xmlhttp.onload = function() {
                    if (xmlhttp.status != 200) {
                        alert(xmlhttp.responseText);
                    } else {
                        var newData = JSON.parse(xmlhttp.responseText);
                        console.log(newData.responseStatus.error);

                        if(newData.responseStatus.error=="")
                        alert("Role modified successfully");

                        
                        else if(newData.responseStatus.error=="ROLE_DUPLICATE_SAME_RIGHTS")
                        alert("CAN'T MODIFY ROLE. ANOTHER ROLE WITH THE SAME RIGHTS ALREADY EXISTS");

                        else if(newData.responseStatus.error=="ROLE_NOT_FOUND")
                        alert("ROLE NOT FOUND");

                        else if(newData.responseStatus.error=="WRONG_PASSWORD")
                        alert("WRONG PASSWORD. PLEASE MAKE SURE YOU TYPED YOUR PASSWORD CORRECTLY");
                        

                        else if(newData.responseStatus.error=="USER_NOT_FOUND")
                        alert("USER NOT FOUND. PLEASE MAKE SURE YOU TYPED YOUR E-MAIL ADDRESS CORRECTLY");

                        else{
                        alert(JSON.stringify(newData));
                        }
                    }
                    modifyRoleForm.removeEventListener("submit",g);
                };

            }


        } else if (target.innerText == "Retrieve Roles") { //institution Retrieve Roles
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            var externspan = div.parentNode.getElementsByTagName("span");
            //  alert(spans[0].innerText);
            if (externspan.length == 1) {
                var xmlhttp = new XMLHttpRequest();
                let data = { institutionName: spans[0].innerText };
                var myJSON = JSON.stringify(data);
                data = myJSON;
                xmlhttp.open("POST", "/institutionDashboard/institutionRetreieveRoles");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(data);
                xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };
                xmlhttp.onload = function() {
                    if (xmlhttp.status != 200) {
                        alert("NOT WORKING");
                    } else {
                        var newJson = JSON.parse(xmlhttp.responseText);
                        if (newJson.responseStatus.status === "SUCCESS") {
                            retrieveRolesHtml(newJson, spans);
                        } else {
                            alert(newJson.responseStatus.error);
                        }
                    }
                };
            } else
            if (externspan[1].parentNode) {
                externspan[1].parentNode.removeChild(externspan[1]);
            }
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }

        } else if (target.innerText == "Info") {
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            var externspan = div.parentNode.getElementsByTagName("span");
            //  alert(spans[0].innerText);
            if (externspan.length == 1) {
                var xmlhttp = new XMLHttpRequest();
                var data = { institutionName: spans[0].innerText };
                var myJSON = JSON.stringify(data);
                data = myJSON;
                xmlhttp.open("POST", "/institutionDashboard/getInfo");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(data);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };
                xmlhttp.onload = function () {
                    if (xmlhttp.status != 200) {
                        alert("NOT WORKING");
                    } else {
                        var newJson = JSON.parse(xmlhttp.responseText);
                        if (newJson.responseStatus.status === "SUCCESS") {
                            console.log("** Before GetMembers! ");
                                infoHtml(newJson, spans);
                            
                        } else {
                            alert(newJson.responseStatus.error);
                        }
                    }
                };
            } else
                if (externspan[1].parentNode) {
                    externspan[1].parentNode.removeChild(externspan[1]);
                }
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }else if(target.innerText == "Get Members"){ 

            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            var externspan = div.parentNode.getElementsByTagName("span");
            //  alert(spans[0].innerText);
            if (externspan.length == 1) {
               getMembers(spans[0].innerText, (returnedObject) => {
                    console.log(returnedObject);
                    membersAddHtml(returnedObject, spans);
               });
            } else
                if (externspan[1].parentNode) {
                    externspan[1].parentNode.removeChild(externspan[1]);
                }
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }

        } else {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            alert(target.innerHTML);
        }

    } else if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    if (event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        event.target.parentElement.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
    }
}

window.onload = function (event) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "institutionDashboard/RetrieveAll");
    xmlhttp.onload = function () {
        var newData = JSON.parse(xmlhttp.responseText);
        renderHTML(newData);
    };
    xmlhttp.send("1");
}

function renderHTML(data) {
    var htmlString = "";
    for (i = 0; i < data.returnedObject.institutions.length; i++) {
        htmlString += "<li class='institutionItem'><div> <span>" + data.returnedObject.institutions[i] + "</span></div> </li> ";
    }
    listInstitution[0].insertAdjacentHTML('beforeend', htmlString);
    nowAdd();

};


function infoHtml(data, spanLocation) {
    var htmlString = "";
    htmlString += "<span class='institutionItemSpan'>";
    if (data.returnedObject.addresses.length == 0)
        var htmlString = "<span class='institutionItemSpan'>No information about this Institution.</span>";
    for (i = 0; i < data.returnedObject.addresses.length; i++) {
        if (i != 0)
            htmlString += "<br>";
        htmlString += "<br>Address " + (i + 1) + "<br>Country:" + data.returnedObject.addresses[i].country + " <br>Region:" + data.returnedObject.addresses[i].region + " <br> City:" + data.returnedObject.addresses[i].city +
            " <br>Street:" + data.returnedObject.addresses[i].street + " <br>Number:" + data.returnedObject.addresses[i].number + "<br> Building:" + data.returnedObject.addresses[i].building +
            " <br>Floor:" + data.returnedObject.addresses[i].floor + "<br> Apartment:" + data.returnedObject.addresses[i].apartment + " <br>Main Address:";
        if (data.returnedObject.addresses[i].isMainAddress == "0")
            htmlString += "NO";
        else
            htmlString += "YES";
    }
    // add members here!!!!!!! nu mai pune span-uri XD
    htmlString += "</span>";
    spanLocation[0].parentNode.insertAdjacentHTML('afterend', htmlString);
};

function membersAddHtml(data, spanLocation) {
    var htmlString = "";
    htmlString += "<span class='memberSpan'>";
    //if (data.members.length == 0)
    //    var htmlString = "<span class='memberSpan'>No information about this Institution.</span>";
    for (i = 0; i < data.members.length; i++) {
        if (i != 0)
            htmlString += "<br>";
        htmlString += "<br>Email:" + data.members[i].email + " Role:" + data.members[i].role;
    }
    // add members here!!!!!!! nu mai pune span-uri XD
    htmlString += "</span>";
    spanLocation[0].parentNode.insertAdjacentHTML('afterend', htmlString);
};

function retrieveRolesHtml(data, spanLocation) {
    var htmlString = "";
    htmlString += "<span class='institutionItemSpan'><br> Roles:";
    if (data.returnedObject.roles.length == 0)
        var htmlString = "<span class='institutionItemSpan'>There are no roles currently created for this institution</span>";
    else {
        for (i = 0; i < data.returnedObject.roles.length; i++) {
            htmlString += '<div class="institutionItemDiv" id=' + "role" + i + "><p>" +
                data.returnedObject.roles[i] + '</p>  <button class="stergeAsta" > Delete</button></div>';
        }
    }
    htmlString += "</span>";
    spanLocation[0].parentNode.insertAdjacentHTML('afterend', htmlString);
};



function nowAdd() {
    var myInstitutions = document.getElementsByClassName("institutionItem");
    var myDropButton = document.getElementById("dropButtonTemplate");
    var i;
    for (i = 0; i < myInstitutions.length; i++) {
        var clone = myDropButton.cloneNode(true);
        var div = myInstitutions[i].getElementsByTagName("div");
        clone.setAttribute("id", i);
        clone.style.display = "block";
        clone.getElementsByClassName("dropbtn")[0].setAttribute("id", i);
        div[0].insertAdjacentElement("afterbegin", clone);
        div[0].setAttribute("id", "institutionItemDiv" + i);
        div[0].setAttribute("class", "institutionItemDiv");
        myInstitutions[i].setAttribute("id", "institutionItem." + i);
    }
};