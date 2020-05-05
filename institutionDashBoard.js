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






var modifyRoleForm=document.getElementById("modifyRoleForm");

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
                  if (div.parentNode) {
                      div.parentNode.removeChild(div);
                  }
              } else {
                  alert(newJson.responseStatus.error);
              }
          }
      };

  }else if (target.innerText == "Create Role") {
    var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
    var spans = div.getElementsByTagName("span");
    modifyRoleForm.institutionName.value=spans[0].innerText;
    var modifyRoleWrapper=document.getElementById("createRoleWrapper");
    modifyRoleWrapper.style.display="flex";
    

    var cancelButton=document.getElementById("cancelButton");
    cancelButton.addEventListener("click",function(){
        modifyRoleWrapper.style.display="none";

    });




    createRoleForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var checkboxes=document.getElementsByClassName("rightsInput");
        for(i=0;i<checkboxes.length;i++)
        {
            if(checkboxes[i].checked==true)
                checkboxes[i].value="1";
            else  
                checkboxes[i].value="0";
        }

        createRoleForm=document.getElementById("createRoleForm");
        var loginData = toJSONString(createRoleForm);
        console.log(loginData);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/institutionDashboard/createInstitutionRole"); //
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

                         alert(JSON.stringify(newData));
            }
        };

    }, false);

      }else if (target.innerText == "Modify Role") {
      var div = document.getElementById(target.parentNode.parentNode.parentNode.id);
      var spans = div.getElementsByTagName("span");
      modifyRoleForm.institutionName.value=spans[0].innerText;
      var modifyRoleWrapper=document.getElementById("modifyRoleWrapper");
      modifyRoleWrapper.style.display="flex";
      

      var cancelButton=document.getElementById("cancelButton");
      cancelButton.addEventListener("click",function(){
          modifyRoleWrapper.style.display="none";

      });




      modifyRoleForm.addEventListener("submit", function (e) {
          e.preventDefault();
          var checkboxes=document.getElementsByClassName("rightsInput");
          for(i=0;i<checkboxes.length;i++)
          {
              if(checkboxes[i].checked==true)
                  checkboxes[i].value="1";
              else  
                  checkboxes[i].value="0";
          }

          modifyRoleForm=document.getElementById("modifyRoleForm");
          var loginData = toJSONString(modifyRoleForm);
          console.log(loginData);
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.open("POST", "/institutionDashboard/institutionModifyRole");
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

                           alert(JSON.stringify(newData));
              }
          };

      }, false);

  }else
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
  htmlString += "<li class='institutionItem'> <span>" + data.returnedObject.institutions[i] + "</span> </li> ";
}
listInstitution[0].insertAdjacentHTML('beforeend', htmlString);
nowAdd();

};

function nowAdd() {
var myInstitutions = document.getElementsByClassName("institutionItem");
var myDropButton = document.getElementById("dropButtonTemplate");
var i;
for (i = 0; i < myInstitutions.length; i++) {
  var clone = myDropButton.cloneNode(true);
  clone.setAttribute("id", i);
  clone.style.display = "block";
  clone.getElementsByClassName("dropbtn")[0].setAttribute("id", i);
  myInstitutions[i].insertAdjacentElement("afterbegin", clone);
  myInstitutions[i].setAttribute("id", "institutionItem." + i);
}
};