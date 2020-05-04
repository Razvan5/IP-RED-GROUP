$(document).ready(function () {
	$('#RetypePassword').hide();
});


$('input[name="Edit"]').on('click', function() {
    var prev = $(this).prev('input'),
        ro   = prev.prop('readonly');
    prev.prop('readonly', !ro).focus();
    $(this).val(ro ? 'Save' : 'Edit');
});


$('input[id="PasswordRequired2"]').on('click', function() {
    var x=document.getElementById("PasswordRequired2");
    if(x.getAttribute('value')=='Edit ')
    $('#RetypePassword').show();
    else {
        var y=document.getElementById("PasswordRequired1");
        if(y.value==''){
            alert("Cannot set empty password!!");
        }else{
         x.setAttribute('value','Edit ');
         y.setAttribute('readonly','readonly');
        }
    }
});


$('input[name="Submit"]').on('click', function() {
    var old = document.getElementById('OldPassword');
    if(old.value==''){
        alert("Please insert your password!");
    }else{
    $('#RetypePassword').hide();
    old.value='';
    var p2 = document.getElementById("PasswordRequired2");
    p2.setAttribute('value','Save');
    var p1=document.getElementById("PasswordRequired1");
    p1.removeAttribute("readonly");
    var ro   = p1.prop('readonly');
    p1.prop('readonly', !ro).focus();}
});