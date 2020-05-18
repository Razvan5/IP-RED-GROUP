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


function toJSONStringInputAndTextarea(form) {
    var obj = {};
    var elements = form.querySelectorAll("input,textarea");
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




var newsFeed = document.getElementById("newsFeed");
var newPostButton=document.getElementById("newPostButton");
var createNewsFeedRelativeContainer=document.getElementById("createNewsFeedRelativeContainer");
var createNewsFeedForm = document.getElementById("createNewsFeedForm");



window.onload = loadThatNewsFeed();
function loadThatNewsFeed() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "home/getNewsFeed");
    xmlhttp.onload = function () {
        var newData = JSON.parse(xmlhttp.responseText);
        getNewsFeedHTML(newData);
    };
    xmlhttp.send("1");
}


function getNewsFeedHTML(data) {
    newsFeed.innerHTML = "";
    var htmlString = '<h1>News Feed</h1><button id="newPostButton" class="formButtons">New Post</button><br>';
    for (i = 0; i < data.returnedObject.posts.length; i++) {
        htmlString += '<article class="newsPiece">' + '<button class="newsDelete">X</button><h1>' + data.returnedObject.posts[i].title + '</h1>' + data.returnedObject.posts[i].content;
        htmlString += '<br><br><a class="notWhite" href="' + 'https://' + data.returnedObject.posts[i].URL + '"><u color="black">' + data.returnedObject.posts[i].URL + '</u></a><br>' + 'Posted: ' + data.returnedObject.posts[i].dateCreated;
        htmlString += '<br><br>Tags:  ';

        for (j = 0; j < data.returnedObject.posts[i].tags.length; j++) {
            htmlString += data.returnedObject.posts[i].tags[j] + ' ';
        }

        htmlString += '</article>';
    }
    newsFeed.innerHTML = htmlString;
    newPostButton=document.getElementById("newPostButton");
    newPostButton.onclick=function(){
        createNewsFeedRelativeContainer.style.display="block";
    }

};




window.onclick = function (event) {
    if (event.target.matches(".newsDelete")) {
        var buton = event.target;
        var parinte = buton.parentNode;
        var RefTestModified = parinte.children;


        var xmlhttp = new XMLHttpRequest();
        let data = { postName: RefTestModified[1].innerText };
        var myJSON = JSON.stringify(data);
        data = myJSON;
        xmlhttp.open("POST", "/home/deleteNewsFeed");
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
                    newsFeed.removeChild(parinte);
                } else {
                    alert(newJson.responseStatus.error);
                }
            }
        };
    }
}


var cancelButton = document.getElementById("cancelButton");
cancelButton.onclick = function(){
    createNewsFeedRelativeContainer.style.display="none";
}



createNewsFeedForm.addEventListener("submit", f, false);

function f(e) {
    e.preventDefault();
    createNewsFeedRelativeContainer.style.display="none";

    createNewsFeedForm = document.getElementById("createNewsFeedForm");
    var loginData = toJSONStringInputAndTextarea(createNewsFeedForm);
    console.log(loginData);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/home/postNews");
    xmlhttp.setRequestHeader("Content-Type", "application/javascript");
    xmlhttp.send(loginData);
    xmlhttp.onerror = function() { // only triggers if the request couldn't be made at all
        console.log("ERROR");
    };

    xmlhttp.onload = function() {
        loadThatNewsFeed(); 
        if (xmlhttp.status != 200) {
            alert(xmlhttp.responseText);
        } else {
            var newData = JSON.parse(xmlhttp.responseText);
            console.log(newData.responseStatus.error);

            if (newData.responseStatus.error == "")
                alert("News Posted");

            else {
                alert("Error... Please try again");
            }
        }
    };
    
}


/*nou*/
window.onload = function(event) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "institutionDashboard/RetrieveYourInstitutions");
    xmlhttp.onload = function() {
        var newData = JSON.parse(xmlhttp.responseText);
        retrieveYourInstitutionsHTML(newData);
    };
    xmlhttp.send("1");
}

function retrieveYourInstitutionsHTML(data) {
    // listInstitution[0].innerHTML = "";
    // var htmlString = "";
    // for (i = 0; i < data.returnedObject.institution.length; i++) {
    //     htmlString += "<article class=\"searchedItem\"><a class=\"nav-link\" href=\"/institutionDashBoard\">"+data.returnedObject.institution[i].institutionName +"</a></article>"
    // }
    // listInstitution[0].insertAdjacentHTML('beforeend', htmlString);
    // nowAdd();
    var mainNode = document.getElementById("searchInstitution");
    for (i = 0; i < data.returnedObject.institution.length; i++) {
        const article=document.createElement("ARTICLE");
        article.className="searchedItem";
        const ahref =document.createElement("A");
        ahref.className="nav-link search";
        ahref.textContent=data.returnedObject.institution[i].institutionName;
        ahref.href="/institutionDashBoard";
        article.appendChild(ahref);
        mainNode.appendChild(article);
    }
    
};

var searchInstitution = document.getElementById('search-txt');
var searchedarticle = document.getElementsByClassName('searchedItem');

searchInstitution.onkeyup = function() {

    var searchedItems = document.getElementsByClassName("search");

    for (i = 0; i < searchedItems.length; i++) {
        var filter = this.value.toUpperCase();
        if (searchedItems[i].textContent.toUpperCase().indexOf(filter) > -1) {
            searchedItems[i].style.display = "";
            searchedarticle[i].style.display="";
        } else {
            searchedItems[i].style.display = "none";
            searchedarticle[i].style.display="none";
        }
    }
   
};