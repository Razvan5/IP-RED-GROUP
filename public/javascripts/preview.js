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
window.onload = function(event) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "preview/Receipt");
    xmlhttp.onload = function() {
        var newData = JSON.parse(xmlhttp.responseText);
        previewInfoHTML(newData);
    };
    xmlhttp.send("1");
}

function previewInfoHTML(data) {
    var htmlString = "";
    console.log(data);
    var previewType = document.getElementById("previewType");
    previewType.innerText = data.returnedObject.document.documentType;
    var date = document.getElementById("date");
    var receiptId = document.getElementById("receiptId");
    var receiptHeader = document.getElementById("header");
    date.innerText = data.returnedObject.document.dateCreated;
    receiptId.innerText = data.returnedObject.document.ID;
    receiptHeader.innerText = data.returnedObject.document.documentType + " Preview";
    var value = 0;
    var table = document.getElementById("here-Items");
    for (i = 0; i < data.returnedObject.document.items.length; i++) {
        htmlString += "<tr class='item-row'> <td class= 'item-number> <div class='delete-wpr'><span>" + (i + 1) + "</span></div></td>" +
            "<td class= 'item-name'><span>" + data.returnedObject.document.items[i].item.description + "</span></td>" +
            "<td ><span class='price'>" + data.returnedObject.document.items[i].item.unitPrice + data.returnedObject.document.items[i].item.currencyTitle + "</span></td>" +
            "<td ><span class='tax'>" + data.returnedObject.document.items[i].item.unitPriceWithTax + data.returnedObject.document.items[i].item.currencyTitle + "</span></td>" +
            "<td ><span class='price-without-tax'>" + data.returnedObject.document.items[i].quantity + "</span></td></tr>";
        value = value + data.returnedObject.document.items[i].unitPriceWithTax;
    }
    table.insertAdjacentHTML('afterend', htmlString);
    var totalValue = document.getElementById("total");
    totalValue.innerText = value + data.returnedObject.document.items[0].item.currencyTitle;
};