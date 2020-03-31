$(document).ready(function(){
    $('#wrapper').fullpage({
        navigation:true,
        loopBottom:true,
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
});

