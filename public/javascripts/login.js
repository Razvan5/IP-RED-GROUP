$(document).ready(function(){
    $('#wrapper').fullpage({
        navigation:true,
        scrollOverflow: true,
    });
});

$(document).ready(function () {
	$('#register-form').hide()
  $('#register-tab').click(function () {
  	$("#login-form").hide();
    $("#register-form").show();
  })
  
  $('#login-tab').click(function () {
		$("#register-form").hide();
    $("#login-form").show();
  })
  
  $(".business-card1").click(function(){
    $(".business-card1").toggleClass("business-card1-active");
  });

  $(".business-card2").click(function(){
    $(".business-card2").toggleClass("business-card2-active");
  });
  
});

function forgotPasswordClick() {
    $('#loginPassword').hide()
    $('#loginPasswordLabel').hide()
    $('#loginButton').hide()
    $('#forgotPassword').hide()

    $('#forgotPasswordSend').show()
}

function forgotPasswordSendClick() {
    inputEmail = $('#email').val()

    const xmlhttp3 = new XMLHttpRequest()
    xmlhttp3.open("POST", "/changePassword")
    xmlhttp3.setRequestHeader("Content-Type", "application/javascript")

    xmlhttp3.send(JSON.stringify({
        email: inputEmail
    }))

    xmlhttp3.onerror = function () {
        console.log("Error")
    }

    window.location.href = window.location.href
}