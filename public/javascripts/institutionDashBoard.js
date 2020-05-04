var listInstitution = document.getElementsByClassName("institutionList");

function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (event.target.matches('.dropdown-element')) {
        var target = event.target;
        if (target.innerText == "Delete") {
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            //  alert(spans[0].innerText);
            var xmlhttp = new XMLHttpRequest();
            let data = { institutionName: spans[0].innerText };
            var myJSON = JSON.stringify(data);
            data = myJSON;
            xmlhttp.open("POST", "/institutionDashboard");
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
                        if (div.parentNode.parentNode) {
                            div.parentNode.parentNode.removeChild(div);
                        }
                    } else {
                        alert(newJson.responseStatus.error);
                    }
                }
            };

        } else if (target.innerText == "Info") {
            var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
            var spans = div.getElementsByTagName("span");
            var externspan = div.parentNode.getElementsByTagName("span");
            //  alert(spans[0].innerText);
            if (externspan.length == 1) {
                var xmlhttp = new XMLHttpRequest();
                let data = { institutionName: spans[0].innerText };
                var myJSON = JSON.stringify(data);
                data = myJSON;
                xmlhttp.open("POST", "/institutionDashboard/getInfo");
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
        } else
            alert(target.innerHTML);
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

window.onload = function(event) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "institutionDashboard/RetrieveAll");
    xmlhttp.onload = function() {
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