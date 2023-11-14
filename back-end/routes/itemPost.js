var express = require('express');
const { db } = require('../schemas/userSchema');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

//Add new item to DB
router.post('/', function(req, res, next){
    console.log('ADD ITEM LOG: ', req.body);
    let shelfLifeParamNum;
    console.log(req.body.date);
    if(req.body.date[1]=='weeks'){
        let lengthNum = parseInt(req.body.date[0])
        shelfLifeParamNum = lengthNum * 7;
        console.log(shelfLifeParamNum);
    } else if (req.body.date[1]=='calendar'){
        let time1 = new Date(req.body.date[0]);
        let time2 = new Date();
        let time3 = time1 - time2;
        let unround = (((time3/1000)/60)/60)/24;
        shelfLifeParamNum = Math.round(unround);
    } else {shelfLifeParamNum = req.body.date[0]};
    let shelfLifeParamStr = shelfLifeParamNum.toString();
    const UserModel = require('../schemas/userSchema');
    const ItemModel = require('../schemas/itemsSchema');
    const UpcModel = require('../schemas/upcSchema');
    UserModel.findOne({userName: req.body.username}).then(data=>{
        if(data.password == req.body.password){
            UpcModel.findOne({upcCode : req.body.upc}).then(d=>{
                if(d==null){
                    let upcItem = new UpcModel({
                        upcCode : req.body.upc,
                        name: req.body.name,
                        shelfLife : shelfLifeParamStr
                    });
                    upcItem.save();
                    //New Item
                    let unixTimeNow = Date.now();
                    let unixShelfLife = 86400000 * shelfLifeParamNum;
                    let unixExpiration = unixTimeNow + unixShelfLife;
                    let complexDate = new Date(unixExpiration);
                    let formattedDate = complexDate.toDateString();
                    let complexNow = new Date(unixTimeNow);
                    let formattedNow = complexNow.toDateString();
                    let newItem = {
                        itemType: req.body.name,
                        purchaseDate: formattedNow, 
                        expirationDate: formattedDate,
                        id : uuidv4()
                    };
                    ItemModel.findOneAndUpdate({userId:req.body.username},
                        {$push: {items: newItem}}, function(err, suc){
                            if(err){console.log(err)} else if(suc){console.log(suc)}
                        }); res.json({status: 'success'});
                } else {
                    //New Item
                    console.log('Writing to DB!');
                    let unixTimeNow = Date.now();
                    let unixShelfLife = 86400000 * shelfLifeParamNum;
                    let unixExpiration = unixTimeNow + unixShelfLife;
                    let complexDate = new Date(unixExpiration);
                    let formattedDate = complexDate.toDateString();
                    let complexNow = new Date(unixTimeNow);
                    let formattedNow = complexNow.toDateString();
                    let newItem = {
                        itemType: req.body.name,
                        purchaseDate: formattedNow, 
                        expirationDate: formattedDate,
                        id : uuidv4()
                    };
                    ItemModel.findOneAndUpdate({userId:req.body.username},
                        {$push: {items: newItem}}, function(err, suc){
                            if(err){console.log(err)} else if(suc){console.log(suc)}
                        }); res.json({status: 'success'});
                };
            })
        }else{res.json({Error:'User UNAUTHORIZED'})}
    });
})

module.exports = router;