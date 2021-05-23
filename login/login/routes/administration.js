var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var connection = require('./user');




router.get('/',(req,res) =>{
    res.render('adlogin');
})
router.get('/',(req,res) =>{
    res.render('adregister');
})

router.post('/',(req,res) =>{
    var form =new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var name = fields.name;
        var pass = fields.password;
        var query = 'select * from administration where adname = "'+name+'" and password = "'+pass+'"';
        console.log(query);
        connection.query(query,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            if(!rows[0]){
                res.json({"status":-1})
            }else{
                res.json({"status":1})
            }
        })
    })
})



router.post('/',(req,res) =>{
    var form =new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        console.log(fields);
        var name = fields.name;
        var pass = fields.pass;
        var email = fields.email;
        var query = `insert into account values ("'+name+'","'+pass+'","'+email+'")`;
        console.log(query);
        connection.query(query,function(err,rows){
            if(err){
                console.log(err);
                return;
            }
                res.json({"status":1})
            
        })
    })
})

module.exports = router;