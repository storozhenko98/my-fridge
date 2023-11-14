var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

//Api call 

router.post('/', function(req, res, next) {
    console.log('UPC FETCH REQ: ', req.body);
    const UserModel = require('../schemas/userSchema');
    const UpcModel = require('../schemas/upcSchema');
    UserModel.findOne({userName: req.body.username}).then(data=>{
        if (data.password == req.body.password){
            UpcModel.findOne({upcCode : req.body.upc}).then(data=>{
                if(data==null){
                    const chompQuery = async (param)=>{
                        let chompUPC = param;
                        const apiResult = await fetch('https://chompthis.com/api/v2/food/branded/barcode.php?api_key=16BSaZTJQCvsT5boe&code=' + chompUPC);
                        const apiJSON = await apiResult.json();
                        return apiJSON;
                    };
                    chompQuery(req.body.upc).then(d=>{
                        let array1 = Object.keys(d);
                        if (array1[0] == 'error'){
                            let upc13 = '0' + req.body.upc;
                            chompQuery(upc13).then(f=>{
                                let array2 = Object.keys(f);
                                if(array2[0]=='error'){
                                    res.json({status:'No such item'})
                                } else {res.json({origin:'chomp', content: f})}
                            })
                        } else {res.json({origin:'chomp', content: d})};
                    })
                } else {res.json({origin:'home', content: data})}
            })
        } else {res.json({status:'USER UNAUTHORIZED'})};
    })
});

module.exports = router;


