$('#submitButton').on("click",function() {

    const institution={
        name: document.getElementById('institutionName').value,
        CIF:document.getElementById('institutionCIF').value,
        address:{
            country:document.getElementById('institutionCountry').value,
            region:document.getElementById('institutionRegion').value,
            city:document.getElementById('institutionCity').value,
            street:document.getElementById('institutionStreet').value,
            number:document.getElementById('institutionNumber').value,
            building:document.getElementById('institutionBuilding').value,
            floor:document.getElementById('institutionFloor').value,
            apartment:document.getElementById('institutionApartment').value,
        }
    }
        document.getElementById('institutionName').value="";
        document.getElementById('institutionCIF').value="";
       document.getElementById('institutionCountry').value="";
         document.getElementById('institutionRegion').value="";
         document.getElementById('institutionCity').value="";
         document.getElementById('institutionStreet').value="";
          document.getElementById('institutionNumber').value="";
         document.getElementById('institutionBuilding').value="";
           document.getElementById('institutionFloor').value="";
            document.getElementById('institutionApartment').value="";

    console.log(institution);
    
    if(validateData(institution)){

        $.ajax({
            type: "POST",
            url: "/createInstitution/create",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({ institution: institution }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){alert("Created Institution. Please Refresh");},
            failure: function(errMsg) {
                alert(errMsg);
            }
        });

    }
    else{
        console.log('error');
    }
}); 


//cod pentru a adauga fail si check
const myNodeList = document.getElementsByClassName("textCorrectitude");//e o colectie NU UN ARRAY nu merg metodele pe array
console.log(myNodeList);
//initializare

let i;
for(i=0;i<myNodeList.length;i++){
    const checkmark =document.createElement("SPAN");
    checkmark.className="checkmark";

    const checkmark_circle =document.createElement("DIV");
    checkmark_circle.className="checkmark_circle";
    const checkmark_stem =document.createElement("DIV");
    checkmark_stem.className="checkmark_stem";
    const checkmark_kick =document.createElement("DIV");
    checkmark_kick.className="checkmark_kick";

    checkmark.appendChild(checkmark_circle);
    checkmark.appendChild(checkmark_stem);
    checkmark.appendChild(checkmark_kick);
    checkmark.id='c'+i;
    checkmark.style.display='none';

    let failmark =document.createElement("SPAN");
    failmark.className="failmark";

    const failmark_circle =document.createElement("DIV");
    failmark_circle.className="failmark_circle";
    const failmark_side1 =document.createElement("DIV");
    failmark_side1.className="failmark_side1";
    const failmark_side2 =document.createElement("DIV");
    failmark_side2.className="failmark_side2";

    failmark.appendChild(failmark_circle);
    failmark.appendChild(failmark_side1);
    failmark.appendChild(failmark_side2);
    failmark.id='f'+i;
    failmark.style.display='none';

    myNodeList[i].appendChild(failmark);
    myNodeList[i].appendChild(checkmark);

}

var institutionName = document.getElementById('institutionName');
institutionName.onkeyup = function() {

    if(this.value.length<=3){
        failmark=document.getElementById('f0');
        checkmark=document.getElementById('c0');
        checkmark.style.display='none';
        failmark.style.display='initial';
    }
   else{
        failmark=document.getElementById('f0');
        checkmark=document.getElementById('c0');
        failmark.style.display='none';
        checkmark.style.display='initial';
    }
};
var institutionCIF = document.getElementById('institutionCIF');
institutionCIF.onkeyup = function() {

    if(!this.value.match(/RO[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]C/)){
        failmark=document.getElementById('f1');
        checkmark=document.getElementById('c1');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f1');
        checkmark=document.getElementById('c1');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }
};
var institutionCountry = document.getElementById('institutionCountry');
institutionCountry.onkeyup = function(){
    if(this.value.length<4){
        failmark=document.getElementById('f2');
        checkmark=document.getElementById('c2');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f2');
        checkmark=document.getElementById('c2');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }

};
var institutionRegion = document.getElementById('institutionRegion');
institutionRegion.onkeyup = function(){
    if(this.value.length==0){
        failmark=document.getElementById('f3');
        checkmark=document.getElementById('c3');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f3');
        checkmark=document.getElementById('c3');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }

};
var institutionCity = document.getElementById('institutionCity');
institutionCity.onkeyup = function(){
    if(this.value.length==0){
        failmark=document.getElementById('f4');
        checkmark=document.getElementById('c4');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f4');
        checkmark=document.getElementById('c4');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }

};
var institutionStreet = document.getElementById('institutionStreet');
institutionStreet.onkeyup = function(){
    if(this.value.length==0){
        failmark=document.getElementById('f5');
        checkmark=document.getElementById('c5');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f5');
        checkmark=document.getElementById('c5');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }

};
var institutionNumber = document.getElementById('institutionNumber');
institutionNumber.onkeyup = function(){
    if(this.value.length==0){
        failmark=document.getElementById('f6');
        checkmark=document.getElementById('c6');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f6');
        checkmark=document.getElementById('c6');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }

};
var institutionBuilding = document.getElementById('institutionBuilding');
institutionBuilding.onkeyup = function(){
    if(this.value.length==0){
        failmark=document.getElementById('f7');
        checkmark=document.getElementById('c7');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f7');
        checkmark=document.getElementById('c7');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }

};
var institutionFloor = document.getElementById('institutionFloor');
institutionFloor.onkeyup = function(){
    if(this.value.length==0){
        failmark=document.getElementById('f8');
        checkmark=document.getElementById('c8');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f8');
        checkmark=document.getElementById('c8');
        checkmark.style.display='initial';
        failmark.style.display='none';

    }

};
var institutionApartment = document.getElementById('institutionApartment');
institutionApartment.onkeyup = function(){
    if(this.value.length==0){
        failmark=document.getElementById('f9');
        checkmark=document.getElementById('c9');
        checkmark.style.display='none';
        failmark.style.display='initial';
        console.log(this.value);
    }
    else{
        failmark=document.getElementById('f9');
        checkmark=document.getElementById('c9');
        checkmark.style.display='initial';
        failmark.style.display='none';
    }

};


var validateData = function(institution){

    if(!(institution.name && institution.CIF)){
        console.log("Numele Companiei sau CIF-ul sunt nule!");
        return false;
    }
    if(!(institution.address.country && institution.address.region && institution.address.city && institution.address.street && institution.address.number && institution.address.building && institution.address.floor && institution.address.apartment)){
        console.log("Adresa are un paramtru null!");
        return false;
    }
    if(!institution.CIF.match(/RO[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]C/)){
        console.log("CIF introdus gresit, format:RO#########C!");
        return false;
    }

    console.log("Verficare cu succes!");

    console.log(institution);
    
    return true;
}

