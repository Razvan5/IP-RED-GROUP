window.onload = function () {
  var sendButton = document.getElementById("sendButton");

  sendButton.onclick = function () {
    var institutionName = document.getElementById("institutionName");
    institutionName = institutionName.value;
    console.log(institutionName);

    var currencyTitle = document.getElementById("currency");
    console.log(currencyTitle.value);

    var productNumber = document.getElementsByClassName("productNumber");
    for (i = 0; i < productNumber.length; i++) {
      console.log(productNumber[i].value);
    }

    var title = document.getElementsByClassName("title");
    for (i = 0; i < title.length; i++) {
      console.log(title[i].value);
    }

    var description = document.getElementsByClassName("description");
    for (i = 0; i < description.length; i++) {
      console.log(description[i].value);
    }

    var valueBeforeTax = document.getElementsByClassName("valueBeforeTax");
    for (i = 0; i < valueBeforeTax.length; i++) {
      console.log(valueBeforeTax[i].value);
    }

    var taxPercentage = document.getElementsByClassName("taxPercentage");
    for (i = 0; i < taxPercentage.length; i++) {
      console.log(taxPercentage[i].value);
    }

    var quantity = document.getElementsByClassName("quantity");
    for (i = 0; i < quantity.length; i++) {
      console.log(quantity[i].value);
    }

    var documentItems = [];
    for (i = 0; i < productNumber.length; i++) {
      documentItems[i] = {
        currencyTitle: currencyTitle.value,
        productNumber: productNumber[i].value,
        title: title[i].value,
        description: description[i].value,
        valueBeforeTax: valueBeforeTax[i].value,
        taxPercentage: taxPercentage[i].value,
        quantity: quantity[i].value
      }
    }

    var data = {
      institutionName: institutionName,
      documentItems: documentItems
    };

    var ok = 1;
    for (i = 0; i < productNumber.length; i++)
      if (valueBeforeTax[i].value == 0 || taxPercentage[i].value == 0 || quantity[i].value == 0)
        ok = 0;
    if (ok == 0)
      alert("Cannot have value of 0");
    else {
      var MyJson = JSON.stringify(data);
      data = MyJson;
      console.log(data);
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", "/createInvoice/uploadInvoice");
      xmlhttp.setRequestHeader("Content-Type", "application/javascript");
      xmlhttp.send(data);
      xmlhttp.onerror = function () { // only triggers if the request couldn't be made at all
        console.log("ERROR");
      };
      xmlhttp.onload = function () {
        if (xmlhttp.status != 200) {
          alert(xmlhttp.responseText);
        } else {
          var newData = JSON.parse(xmlhttp.responseText);
          if(newData.responseStatus.error=='')
          alert("Success! Document posted");
          else alert("Error, please try again!");

        }
      };
    }
  };

};


function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today = months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}

// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number, decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff, cutoff + 1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff + 1, cutoff + 2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff, cutoff + 1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    }
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0, cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".") + 1)).length;
  for (var i = 0; i < decimals - decs; i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_total() {
  var total = 0;
  $('.price').each(function (i) {
    price = $(this).html().replace("$", "");
    if (!isNaN(price)) total += Number(price);
  });

  total = roundNumber(total, 2);

  $('#subtotal').html("$" + total);
  $('#total').html("$" + total);

  update_balance();
}

function update_balance() {
  var due = $("#total").html().replace("$", "") - $("#paid").val().replace("$", "");
  due = roundNumber(due, 2);

  $('.due').html("$" + due);
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace("$", "") * row.find('.qty').val();
  price = roundNumber(price, 2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("$" + price);

  update_total();
}

function bind() {
  $(".cost").blur(update_price);
  $(".qty").blur(update_price);
}

$(document).ready(function () {

  $('input').click(function () {
    $(this).select();
  });

  $("#paid").blur(update_balance);

  $("#addrow").click(function () {
    $(".item-row:last").after('<tr class="item-row"><td class="item-number"><div class="delete-wpr"><textarea class="productNumber">Number</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td class="item-name"><textarea class="title">Item Name</textarea></td><td><textarea class="description">Description</textarea></td><td><textarea class="valueBeforeTax">0</textarea></td><td><textarea class="taxPercentage">0</textarea></td><td><textarea class="quantity">0</textarea></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });

  bind();

  $(".delete").live('click', function () {
    console.log("PLMSQL");
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });

  $("#cancel-logo").click(function () {
    $("#logo").removeClass('edit');
  });
  $("#delete-logo").click(function () {
    $("#logo").remove();
  });
  $("#change-logo").click(function () {
    $("#logo").addClass('edit');
    $("#imageloc").val($("#image").attr('src'));
    $("#image").select();
  });
  $("#save-logo").click(function () {
    $("#image").attr('src', $("#imageloc").val());
    $("#logo").removeClass('edit');
  });

  $("#date").val(print_today());

});


window.onclick = function (event) {
  if (event.target.matches(".delete")) {
      var buton = event.target;
      var parinte = buton.parentNode.parentNode.parentNode;
      console.log(parinte);
      var bunic=parinte.parentNode;
      bunic.removeChild(parinte);
  }
  else{
    var subtotal=document.getElementById("subtotal");
    var total=document.getElementById("total");
    var due=this.document.getElementById("due");
    subtotal.innerText=calculSubtotal();
    total.innerText=calculTotal();
    due.innerText=calculTotal();
  
    function calculSubtotal(){
      var currencyTitle = document.getElementById("currency");
      var productNumber = document.getElementsByClassName("productNumber");
      var valueBeforeTax = document.getElementsByClassName("valueBeforeTax");
      var quantity = document.getElementsByClassName("quantity");

      var paid=document.getElementById("paid");
      paid.innerText = String(currencyTitle.value+' '+'0.00');

      var rezultat=0;
      for(i=0;i<productNumber.length;i++){
        rezultat+= valueBeforeTax[i].value*quantity[i].value;
      }
      return String(currencyTitle.value+' '+rezultat);
    }

    function calculTotal(){
      var currencyTitle = document.getElementById("currency");
      var productNumber = document.getElementsByClassName("productNumber");
      var valueBeforeTax = document.getElementsByClassName("valueBeforeTax");
      var taxPercentage = document.getElementsByClassName("taxPercentage");
      var quantity = document.getElementsByClassName("quantity");
      var rezultat=0;
      for(i=0;i<productNumber.length;i++){
        rezultat+= valueBeforeTax[i].value*quantity[i].value+taxPercentage[i].value*valueBeforeTax[i].value*quantity[i].value;
      }
      return String(currencyTitle.value+' '+rezultat);
    }
  }
}