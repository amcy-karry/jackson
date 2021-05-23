var express = require ('express');
var router = express.Router();
var User = require('./object/user');
var connection=require('./sql.js');

router.get('/',(req,res) =>{
    res.render('register');
});


router.post('/',(req,res) =>{
    let user = new User(req.body.name,req.body.pass);
    console.log(req.body.name);
    var query='insert user (username,password) values ("'+user.name+'","'+user.pass+'")'
    connection.query(query,(err,results,fields) =>{
        res.send("register success!");
    })
})

module.exports = router;
