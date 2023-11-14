var express = require('express');
var router = express.Router();

/* GET DB List */
router.post('/', function(req, res, next){
    console.log('THIS IS BODY: ', req.body);
    const UserModel = require('../schemas/userSchema');
    const ItemModel = require('../schemas/itemsSchema');
    console.log('THIS IS RED BODY NAME: ', req.body.username);
    UserModel.findOne({userName: req.body.username}).then(data =>{
      console.log('THIS IS DATA FROM FIRST PASS', data);
      console.log('DATA USER', data.userName);
      if(data.password == req.body.password){
        console.log('SEARCH FOR ITEM', req.body.username);
        let searchPARAM = req.body.username;
        console.log(searchPARAM);
        ItemModel.findOne({userId: searchPARAM}).then(data=>{
          console.log('THIS IS DATA FROM SECOND PASS: ', data);
          res.json({list: data});
        })}
      else {res.json({status: 'UNAUTHORIZED'})}
    })
  });
  
module.exports = router;
