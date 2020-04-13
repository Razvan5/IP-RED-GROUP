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



    

