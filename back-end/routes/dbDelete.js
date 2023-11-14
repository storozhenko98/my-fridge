var express = require('express');
var router = express.Router();

/* GET DB List */
router.post('/', function(req, res, next){
    console.log(req.body, 'DELETE REQUEST');
    const UserModel = require('../schemas/userSchema');
    const ItemModel = require('../schemas/itemsSchema');
    UserModel.findOne({userName: req.body.username}).then(data =>{
      if(data.password == req.body.password){
        ItemModel.findOneAndUpdate({userId : req.body.username}, 
            {$pull : {items: {id: req.body.uuid}}}, function(err, suc){
                if(err){console.log(err)} else if(suc){console.log(suc)}
            }); res.json({status: 'success'})
      }
      else {res.json({status: 'UNAUTHORIZED'})}
    })
  });
  
module.exports = router;

