var express = require('express');
var router = express.Router();


/*  Get Login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
  console.log(req.body);
  const UserModel = require('../schemas/userSchema');
  const ItemModel = require('../schemas/itemsSchema');
  UserModel.findOne({userName: req.body.username}).then(data =>{
    if (data == null){res.json({status: 'Login Info Incorrect'})}
    else
    if(data.password == req.body.password){
      ItemModel.findOne({userId: req.body.ursername}).then(data=>{
        res.json({status: 'Logged In', list: data});
      })}
    else {res.json({status: 'Login Info Incorrect'})}
  })
});

module.exports = router;
