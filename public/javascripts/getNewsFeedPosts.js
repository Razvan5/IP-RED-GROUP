var email = "vlad.loghin00@gmail.com";
var password = "parola";
var numberOfPosts = 20;
var requestBody = `email=${email}&hashedPassword=${password}&postsCount=${numberOfPosts}`;

var xhr = new XMLHttpRequest();
xhr.onload = () => {
  const serverResponse = document.getElementById("newsfeedres");
  serverResponse.innerHTML = this.responseText;
};
xhr.open("POST", "/getposts");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(requestBody);
