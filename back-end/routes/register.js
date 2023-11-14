var express = require('express');
var router = express.Router();


//User Name Validation  
router.post('/userValidate', function(req, res, next){
  console.log(req.body);
  console.log(req.body.username);
  const UserModel = require('../schemas/userSchema');
  UserModel.findOne({userName: req.body.username}).then(data =>{
    if (data == null){res.json({status : 'Success'})}
    else {res.json({status: 'User Exists'})}
  }).catch(err => {res.json({status: 'Error', Details : err})});
});

//Phone Validation 
router.post('/phoneValidate', function(req, res, next){
  console.log(req.body);
  console.log(req.body.phone);
  const UserModel = require('../schemas/userSchema');
  UserModel.findOne({phone: req.body.phone}).then(data =>{
    if (data == null){res.json({status : 'Success'})}
    else {res.json({status: 'Phone Number already in use'})}
  }).catch(err => {res.json({status: 'Error', Details : err})});
});

//Create User 
router.post('/finalRegister', function(req, res, next){
  console.log(req.body);
  const UserModel = require('../schemas/userSchema');
  const ItemModel = require('../schemas/itemsSchema');
  let usr = new UserModel({
    userName : req.body.username,
    password : req.body.password,
    phone: req.body.phone
  });
  let items = new ItemModel({
    userId : req.body.username
  });
  usr.save();
  items.save();
  res.json({status : 'Registered'})
});

module.exports = router;


