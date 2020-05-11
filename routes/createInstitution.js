
var express = require('express');
var router = express.Router();
const axios = require('axios');
const qs = require('qs');
const path = require('path');


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/pages/createInstitution.html'));
});

router.post('/create' , function(req,res,next){
  //console.log(req.body.institution);

  const institution=req.body.institution;
  console.log(institution);


  // var url = `https://fiscaldocumentsapi.azurewebsites.net/Institution/Create.php?
  // email=""&
  // hashedPassword=""&
  // institutionName="${institution.name}"&

  // institutionAddress={
  //   "Country":"${institution.adress.country}",
  //   "Region":"${institution.adress.region}",
  //   "City":"${institution.adress.city}",
  //   "Street":"${institution.adress.street}",
  //   "Number":${institution.adress.number},
  //   "Building":"${institution.adress.building}",
  //   "Floor":${institution.adress.floor},
  //   "Apartment":${institution.adress.apartment}
  // }`;


  var object ={
    Country:institution.address.country,
    Region:institution.address.region,
    City:institution.address.city,
    Street:institution.address.street,
    Number:institution.address.number,
    Building:institution.address.building,
    Floor:institution.address.floor,
    Apartment:institution.address.apartment
  }

  console.log("IMPORTANT"+req.session.email);
  console.log("IMPORTANT"+req.session.password);

  var json = JSON.stringify(object);
  console.log(json);
  axios({
    method: 'post',
    url: 'https://fiscaldocumentsapi.azurewebsites.net/Institution/Create.php',
    data: qs.stringify({
      email:req.session.email,
      hashedPassword:req.session.password,
      institutionName:institution.name,
      institutionAddress:json,
      institutionCIF:institution.CIF
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(function (response) {
    console.log(response.data);
    return res.status(200).json({
      success: true
    });
  })
  .catch(function (error) {
    console.log(error);
  });


  
});



module.exports = router;
