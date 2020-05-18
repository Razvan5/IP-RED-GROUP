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


var institutionData;
var myDocuments = document.getElementById("fNameForm");
var newData;

window.onload = function (event) {


    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", "sendDocuments/RetrieveAll", false);
    xmlhttp2.onload = function () {
        institutionData = JSON.parse(xmlhttp2.responseText);
        console.log(institutionData);
    };
    xmlhttp2.send("2");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "sendDocuments/retrieveUserCreatedDocs", false);
    xmlhttp.onload = function () {
        newData = JSON.parse(xmlhttp.responseText);
        console.log(newData);
        retrieveUserCreatedDocsHTML(newData);
    };
    xmlhttp.send("1");
}


function retrieveUserCreatedDocsHTML(data) {
    myDocuments.innerHTML = '';
    var htmlString = '<H2>MY DOCUMENTS:</H2>';
    for (i = 0; i < data.returnedObject.documents.length; i++) {
        var senderInstitutionName;
        for (j = 0; j < institutionData.returnedObject.institutions.length; j++) {
            if (data.returnedObject.documents[i].senderInstitutionID == institutionData.returnedObject.institutions[j].ID)
                senderInstitutionName = institutionData.returnedObject.institutions[j].name;
        }

        htmlString += '<div class="inputContainer"><input class="Edit" name="Edit" type="button" value="Send"><input class="Edit" name="Edit" type="button" value="Delete" data-institution_name="' + senderInstitutionName + '" data-document_id="' + data.returnedObject.documents[i].ID + '"><pre><h3>   Document ID: <span>' + data.returnedObject.documents[i].ID + '</span>; From Institution: ' + '<span>' + senderInstitutionName + '</span><br>   Send to the following Institution: <br>   <input type="text" required placeholder="Institution Name"></h3></pre></div><br>';
    }
    myDocuments.innerHTML = htmlString;

};


window.onclick = function (event) {
    if (event.target.value == 'Delete') {
        const xmlhttp3 = new XMLHttpRequest()
        xmlhttp3.open("POST", "/sendDocuments/deleteDocument")
        xmlhttp3.setRequestHeader("Content-Type", "application/javascript")

        xmlhttp3.send(JSON.stringify({
            institutionName: event.target.dataset.institutionName,
            documentID: event.target.dataset.document_id
        }))

        xmlhttp3.onerror = function () {
            console.log("Error")
        }
        xmlhttp3.onload = function () {
            if (xmlhttp3.status !== 200)
                console.log("Service failure")
            else {
                console.log(xmlhttp3.responseText)

                const newJson = JSON.parse(xmlhttp3.responseText)
                if (newJson.responseStatus.status === "SUCCESS")
                    console.log("Document removed")
                else
                    console.log("Document removal failed: " + newJson.responseStatus.error)
            }

            window.location.href = window.location.href
        }
    }
    else if (event.target.value == 'Send') {
        var buton = event.target;
        var parinte = buton.parentNode;
        var elemente = parinte.children;
        elemente = elemente[1];
        elemente = elemente.children[0].children;
        console.log(elemente);
        console.log(elemente[0].innerText);
        console.log(elemente[1].innerText);
        console.log(elemente[4].value);
        if (elemente[4].value == '')
            this.alert("Please specify an Institution");
        else {
            var receiverInstID;
            for (i = 0; i < this.institutionData.returnedObject.institutions.length; i++)
                if (elemente[4].value == institutionData.returnedObject.institutions[i].name)
                    receiverInstID = institutionData.returnedObject.institutions[i].ID;
            var data = { senderInstitutionName: elemente[1].innerText, documentID: elemente[0].innerText, receiverInstitutionID: receiverInstID };
            var myJSON = JSON.stringify(data);
            data = myJSON;
            console.log(data);
            var xmlhttp3= new XMLHttpRequest();
            xmlhttp3.open("POST", "/sendDocuments/sendThatDocument");
            xmlhttp3.setRequestHeader("Content-Type", "application/javascript");
            xmlhttp3.send(data);
            xmlhttp3.onerror = function () { // only triggers if the request couldn't be made at all
                console.log("ERROR");
            };
            xmlhttp3.onload = function () {
                if (xmlhttp3.status != 200) {
                    alert("NOT WORKING");
                } else {
                    console.log(xmlhttp3.responseText);
                    var newJson = JSON.parse(xmlhttp3.responseText);
                    if (newJson.responseStatus.status === "SUCCESS")
                          alert("Document sent");
                    else if(newJson.responseStatus.error === "INVALID_RECEIVER_INSTITUTION")
                        alert("Invalid Institution");
                    else {
                        alert("Document already sent");
                    }
                }
            }

        }
    }
};