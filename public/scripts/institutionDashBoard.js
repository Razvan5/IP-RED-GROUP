
$(document).ready(function () {
    $("#modify_institution").hide();
    $("#institution_members").hide();
    $("#document_sending").hide();
    $("#document_checking").hide();
    $("#institution_info").show();
    
  $('#institutionInfo').click(function () {

    $("#modify_institution").hide();
    $("#institution_members").hide();
    $("#document_sending").hide();
    $("#document_checking").hide();
    $("#institution_info").show();
  })
  
  $('#modifyInstitution').click(function () {

    $("#institution_info").hide();
    $("#institution_members").hide();
    $("#document_sending").hide();
    $("#document_checking").hide();
    $("#modify_institution").show();
    })

    $('#institutionMembers').click(function () {

	$("#institution_info").hide();
    $("#modify_institution").hide();
    $("#document_sending").hide();
    $("#document_checking").hide();
    $("#institution_members").show();
    })
    
    $('#documentSending').click(function () {

        $("#institution_info").hide();
        $("#modify_institution").hide();
        $("#institution_members").hide();
        $("#document_sending").show();
        $("#document_checking").hide();
    })


    $('#documentChecking').click(function () {
      
        $("#institution_info").hide();
        $("#modify_institution").hide();
        $("#institution_members").hide();
        $("#document_sending").hide();
        $("#document_checking").show();
  })
  
});
