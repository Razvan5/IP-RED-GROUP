function changeLanguage(language) {
  var element = document.getElementById("url");
  element.value = language;
  element.innerHTML = language;
}

function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  } else{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if(openDropdown.classList.contains('show')){
        openDropdown.classList.remove('show');
      }
    }
      event.target.parentElement.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
    }
  }

  window.onload = function (event) {
    var myInstitutions = document.getElementsByClassName("institutionItem");
    var myDropButton = document.getElementById("dropButtonTemplate");
    var i;
    for (i = 0; i < myInstitutions.length; i++) {
      var clone = myDropButton.cloneNode(true);
      clone.setAttribute("id", i);
      clone.style.display = "block";
      //clone.getElementsByClassName("dropbtn")[0].setAttribute("id")
      myInstitutions[i].insertAdjacentElement("afterbegin", clone);
    }

  }