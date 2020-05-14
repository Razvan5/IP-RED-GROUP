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
var createRoleForm = document.getElementById("createRoleForm");
var changeButton = document.getElementById("changeButton");
var myOrAllInstitutions = document.getElementById("myOrAllInstitutions");
var listInstitution = document.getElementsByClassName("institutionList");


function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function getMembers(institutionName, callback) {
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
window.onclick = function (event) {
    console.log(event.target.innerText);
    if (event.target.matches('.removeAsta')) {
        var target = event.target;
        var memberEmail = document.getElementById(target.id);
        console.log(memberEmail.value);
        var memberInstitution = document.getElementById(target.parentNode.parentNode.parentNode.id);
        var spans = memberInstitution.getElementsByTagName("span");
        var instNameWow = document.getElementById("actualInstitutionName").innerText;
        let data;
        var xmlhttp = new XMLHttpRequest();
        data = { institutionName: instNameWow, memberEmail: memberEmail.value };

        console.log(data);
        var myJSON = JSON.stringify(data);
        data = myJSON;
        xmlhttp.open("POST", "/institutionDashboard/removeMember");
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
                    if (target.parentNode) {
                        target.parentNode.parentNode.removeChild(target.parentNode);
                    }
                } else {
                    alert(newJson.responseStatus.error);
                }
            }
        };
    } else if (event.target.matches('.stergeAsta')) {
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
            createRoleCancelButton.addEventListener("click", function () {
                createRoleWrapper.style.display = "none";
            });




            createRoleForm.addEventListener("submit", f, false);

            function f(e) {
                e.preventDefault();
                createRoleWrapper.style.display = "none";

                createRoleForm = document.getElementById("createRoleForm");
                var loginData = toJSONString(createRoleForm);
                console.log(loginData);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/institutionDashboard/institutionCreateRole");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(loginData);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };

                xmlhttp.onload = function () {
                    if (xmlhttp.status != 200) {
                        alert(xmlhttp.responseText);
                    } else {
                        var newData = JSON.parse(xmlhttp.responseText);
                        console.log(newData.responseStatus.error);

                        if (newData.responseStatus.error == "")
                            alert("Role created");

                        else if (newData.responseStatus.error == "DUPLICATE_ROLE")
                            alert("DUPLICATE ROLE");

                        else if (newData.responseStatus.error == "ROLE_DUPLICATE_SAME_RIGHTS")
                            alert("REDUNDANT ROLE: THE ROLE YOU ARE TRYING TO CREATE\n HAS THE SAME RIGHTS AS AN ALREADY EXISTING ROLE");

                        else if (newData.responseStatus.error == "WRONG_PASSWORD")
                            alert("WRONG PASSWORD. PLEASE MAKE SURE YOU TYPED YOUR PASSWORD CORRECTLY");

                        else if (newData.responseStatus.error == "USER_NOT_FOUND")
                            alert("USER NOT FOUND. PLEASE MAKE SURE YOU TYPED YOUR E-MAIL ADDRESS CORRECTLY");

                        else {
                            alert(JSON.stringify(newData));
                        }
                    }
                };

                createRoleForm.removeEventListener("submit", f);
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

            });




            modifyRoleForm.addEventListener("submit", g, false);

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
                xmlhttp.onload = function () {
                    if (xmlhttp.status != 200) {
                        alert(xmlhttp.responseText);
                    } else {
                        var newData = JSON.parse(xmlhttp.responseText);
                        console.log(newData.responseStatus.error);

                        if (newData.responseStatus.error == "")
                            alert("Role modified successfully");


                        else if (newData.responseStatus.error == "ROLE_DUPLICATE_SAME_RIGHTS")
                            alert("CAN'T MODIFY ROLE. ANOTHER ROLE WITH THE SAME RIGHTS ALREADY EXISTS");

                        else if (newData.responseStatus.error == "ROLE_NOT_FOUND")
                            alert("ROLE NOT FOUND");

                        else if (newData.responseStatus.error == "WRONG_PASSWORD")
                            alert("WRONG PASSWORD. PLEASE MAKE SURE YOU TYPED YOUR PASSWORD CORRECTLY");


                        else if (newData.responseStatus.error == "USER_NOT_FOUND")
                            alert("USER NOT FOUND. PLEASE MAKE SURE YOU TYPED YOUR E-MAIL ADDRESS CORRECTLY");

                        else {
                            alert(JSON.stringify(newData));
                        }
                    }
                    modifyRoleForm.removeEventListener("submit", g);
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
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };
                xmlhttp.onload = function () {
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
        } else if (target.innerText == "Members Dashboard") { /////////////// HERE
            console.log(target);
            var wrapperInstitutions = document.getElementById("wrapperInstitutions");
            var membersDashboardTab = document.getElementById("membersDashboardTab");
            var Label = document.getElementById("actualInstitutionName");

            var parentDiv = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = parentDiv.getElementsByTagName("span");
            var actualInstitutionName = spans[0].innerHTML;

            wrapperInstitutions.style.display = "none";
            membersDashboardTab.style.display = "block";
            console.log(target.parentElement);
            console.log(actualInstitutionName);
            Label.innerText = actualInstitutionName;

            var membersList = document.getElementById("currentInstiutionMembers").getElementsByClassName("currentInstiutionMember");
            getMembers(actualInstitutionName, (returnedObject) => {
                console.log(returnedObject);
                membersAddHtml(returnedObject, membersList);
            });

        } else if (target.innerText == "Get Members") {

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

        } else if (target.innerText == "Add Members") { ////////////// ADD MEMBERS

            console.log("WOWOWOWOWOWOW");
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            addMembersForm.institutionName.value = spans[0].innerText;
            var addMembersWrapper = document.getElementById("addMembersWrapper");
            addMembersWrapper.style.display = "flex";


            var addMembersCancelButton = document.getElementById("addMembersCancelButton");
            addMembersCancelButton.addEventListener("click", function () {
                addMembersWrapper.style.display = "none";
            });




            addMembersForm.addEventListener("submit", f, false);

            function f(e) {
                e.preventDefault();
                addMembersWrapper.style.display = "none";

                addMembersForm = document.getElementById("addMembersForm");
                var addMemberData = toJSONString(addMembersForm);
                console.log(addMemberData);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/institutionDashboard/institutionAddMembers");
                xmlhttp.setRequestHeader("Content-Type", "application/javascript");
                xmlhttp.send(addMemberData);
                xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
                    console.log("ERROR");
                };

                xmlhttp.onload = function () {
                    if (xmlhttp.status != 200) {
                        alert(xmlhttp.responseText);
                    } else {
                        var newData = JSON.parse(xmlhttp.responseText);
                        console.log(newData.responseStatus.error);

                        if (newData.responseStatus.error == "")
                            alert("Role created");

                        else if (newData.responseStatus.error == "DUPLICATE_ROLE")
                            alert("DUPLICATE ROLE");

                        else if (newData.responseStatus.error == "ROLE_DUPLICATE_SAME_RIGHTS")
                            alert("REDUNDANT ROLE: THE ROLE YOU ARE TRYING TO CREATE\n HAS THE SAME RIGHTS AS AN ALREADY EXISTING ROLE");

                        else if (newData.responseStatus.error == "WRONG_PASSWORD")
                            alert("WRONG PASSWORD. PLEASE MAKE SURE YOU TYPED YOUR PASSWORD CORRECTLY");

                        else if (newData.responseStatus.error == "USER_NOT_FOUND")
                            alert("USER NOT FOUND. PLEASE MAKE SURE YOU TYPED YOUR E-MAIL ADDRESS CORRECTLY");

                        else {
                            alert(JSON.stringify(newData));
                        }
                    }
                };

                addMembersForm.removeEventListener("submit", f);
            }

        } else if (target.innerText == "Edit") {
            var modifyInstitutionWrapper = document.getElementById("modifyInstitutionWrapper");
            modifyInstitutionWrapper.style.display = "flex";
            var modifyInstitutionOldNameLabel = document.getElementById("modifyInstitutionOldNameLabel");
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            modifyInstitutionOldNameLabel.innerText = spans[0].innerText;
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
    xmlhttp.open("GET", "institutionDashboard/RetrieveYourInstitutions");
    xmlhttp.onload = function () {
        var newData = JSON.parse(xmlhttp.responseText);
        retrieveYourInstitutionsHTML(newData);
    };
    xmlhttp.send("1");
}


changeButton.onclick = function () {
    if (changeButton.innerText == "View All Institutions") {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "institutionDashboard/RetrieveAll");
        xmlhttp.onload = function () {
            var newData = JSON.parse(xmlhttp.responseText);
            retrieveAllInstitutionsHTML(newData);
        };
        xmlhttp.send("1");
        changeButton.innerText = "View Your Institutions"
        myOrAllInstitutions.innerText = "All Institutions:"

    } else if (changeButton.innerText == "View Your Institutions") {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "institutionDashboard/RetrieveYourInstitutions");
        xmlhttp.onload = function () {
            var newData = JSON.parse(xmlhttp.responseText);
            retrieveYourInstitutionsHTML(newData);
        };
        xmlhttp.send("1");
        changeButton.innerText = "View All Institutions"
        myOrAllInstitutions.innerText = "My Institutions:"

    }
}

function renderHTML(data) {
    var htmlString = "";
    for (i = 0; i < data.returnedObject.institutions.length; i++) {
        htmlString += "<li class='institutionItem'><div> <span>" + data.returnedObject.institutions[i].name + "</span></div> </li> ";
    }
    listInstitution[0].insertAdjacentHTML('beforeend', htmlString);
    nowAdd();

};

function retrieveAllInstitutionsHTML(data) {
    listInstitution[0].innerHTML = "";
    var htmlString = "";
    for (i = 0; i < data.returnedObject.institutions.length; i++) {
        htmlString += "<li class='institutionItem'><div> <span>" + data.returnedObject.institutions[i].name + "</span></div> </li> ";
    }
    listInstitution[0].insertAdjacentHTML('beforeend', htmlString);
    nowAdd();

};

function retrieveYourInstitutionsHTML(data) {
    listInstitution[0].innerHTML = "";
    console.log(data);
    var htmlString = "";
    for (i = 0; i < data.returnedObject.institution.length; i++) {
        htmlString += "<li class='institutionItem'><div> <span>" + data.returnedObject.institution[i].institutionName + "</span></div> </li> ";
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
        htmlString += '<div class="institutionItemDiv"> Email:' + data.members[i].email + "<br> Role:" + data.members[i].role + '<button class="removeAsta" value= ' + data.members[i].email + ' id=' + "memberRemove" + i + '> Remove</button></div>';
    }
    // add members here!!!!!!! nu mai pune span-uri XD
    htmlString += "</span>";
    spanLocation[0].parentNode.insertAdjacentHTML('afterend', htmlString);
};

function retrieveRolesHtml(data, spanLocation) {
    var htmlString = "";
    htmlString += "<span class='institutionItemSpan'><br> Roles:";
    if (data.returnedObject.roles.length == 0)
        var htmlString = "<span class='institutionItemSpan'>There are no roles currently created for this institution";
    else {
        for (i = 0; i < data.returnedObject.roles.length; i++) {
            htmlString += '<div class="institutionItemDiv" id=' + "role" + i + "><p>" +
                data.returnedObject.roles[i].name + '</p>  <button class="stergeAsta" > Delete</button></div>';
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
//wow
$('#membersDashboardTabBack').on("click", function () {
    var wrapperInstitutions = document.getElementById("wrapperInstitutions");
    var membersDashboardTab = document.getElementById("membersDashboardTab");
    membersDashboardTab.style.display = "none";
    wrapperInstitutions.style.display = "block";


    var oldElements = membersDashboardTab.getElementsByClassName("memberSpan");
    for (let i = 0; i < oldElements.length; i++) {
        oldElements[i].remove();
    }
});

$('#membersDashboardTabAddMember').on("click", function () {
    console.log("WOWOWOWOWOWOW");
    var target = document.getElementById('membersDashboardTabAddMember');
    var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
    var instNameWow = document.getElementById('actualInstitutionName').innerText;
    addMembersForm.institutionName.value = instNameWow;
    var addMembersWrapper = document.getElementById("addMembersWrapper");
    addMembersWrapper.style.display = "flex";


    var addMembersCancelButton = document.getElementById("addMembersCancelButton");
    addMembersCancelButton.addEventListener("click", function () {
        addMembersWrapper.style.display = "none";
    });




    addMembersForm.addEventListener("submit", f, false);

    function f(e) {
        e.preventDefault();
        addMembersWrapper.style.display = "none";

        addMembersForm = document.getElementById("addMembersForm");
        var addMemberData = toJSONString(addMembersForm);
        console.log(addMemberData);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/institutionDashboard/institutionAddMembers");
        xmlhttp.setRequestHeader("Content-Type", "application/javascript");
        xmlhttp.send(addMemberData);
        xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
            console.log("ERROR");
        };

        xmlhttp.onload = function () {
            if (xmlhttp.status != 200) {
                alert(xmlhttp.responseText);
            } else {
                var newData = JSON.parse(xmlhttp.responseText);
                console.log(newData.responseStatus.error);

                if (newData.responseStatus.error == "")
                    alert("Role created");

                else if (newData.responseStatus.error == "DUPLICATE_ROLE")
                    alert("DUPLICATE ROLE");

                else if (newData.responseStatus.error == "ROLE_DUPLICATE_SAME_RIGHTS")
                    alert("REDUNDANT ROLE: THE ROLE YOU ARE TRYING TO CREATE\n HAS THE SAME RIGHTS AS AN ALREADY EXISTING ROLE");

                else if (newData.responseStatus.error == "WRONG_PASSWORD")
                    alert("WRONG PASSWORD. PLEASE MAKE SURE YOU TYPED YOUR PASSWORD CORRECTLY");

                else if (newData.responseStatus.error == "USER_NOT_FOUND")
                    alert("USER NOT FOUND. PLEASE MAKE SURE YOU TYPED YOUR E-MAIL ADDRESS CORRECTLY");

                else {
                    alert(JSON.stringify(newData));
                }
            }
        };

        addMembersForm.removeEventListener("submit", f);
    };
});

//razvan 
$('#submitButtonEditInstitution').on("click", function() {

    const institution = {
        oldName: document.getElementById('modifyInstitutionOldNameLabel').innerText,
        name: document.getElementById('newInstitutionName').value,
        address: {
            country: document.getElementById('institutionCountry').value,
            region: document.getElementById('institutionRegion').value,
            city: document.getElementById('institutionCity').value,
            street: document.getElementById('institutionStreet').value,
            number: document.getElementById('institutionNumber').value,
            building: document.getElementById('institutionBuilding').value,
            floor: document.getElementById('institutionFloor').value,
            apartment: document.getElementById('institutionApartment').value,
        }
    }


    console.log(institution);
    if (validateData(institution)) {
        document.getElementById('modifyInstitutionOldNameLabel').innerText = "";
        document.getElementById('newInstitutionName').value = "";
        document.getElementById('institutionCountry').value = "";
        document.getElementById('institutionRegion').value = "";
        document.getElementById('institutionCity').value = "";
        document.getElementById('institutionStreet').value = "";
        document.getElementById('institutionNumber').value = "";
        document.getElementById('institutionBuilding').value = "";
        document.getElementById('institutionFloor').value = "";
        document.getElementById('institutionApartment').value = "";
        var modifyInstitutionWrapper = document.getElementById("modifyInstitutionWrapper");
        modifyInstitutionWrapper.style.display = "none";
        $.ajax({
            type: "POST",
            url: "/InstitutionDashboard/modify",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({ institution: institution }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) { alert("Modified Institution. Please Refresh"); },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });

    }
    else {
        console.log('error');
    }
});

var validateData = function(institution) {

    if (!(institution.name)) {
        alert("Numele Companiei este null!");
        return false;
    }
    if (!(institution.address.country && institution.address.region && institution.address.city && institution.address.street && institution.address.number && institution.address.building && institution.address.floor && institution.address.apartment)) {
        alert("Adresa are un paramtru null!");
        return false;
    }
    // console.log("Verficare cu succes!");

    // console.log(institution);

    return true;
}