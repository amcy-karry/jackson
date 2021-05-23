const { query } = require('express');
var express = require('express');
const app = require('../app');
var router = express.Router();
var connection = require('./sql.js');


router.get('/',(req,res,) =>{
    res.render('login');
});
router.post('/',(req,res) => {
    let name = req.body.name;
    let pass = req.body.password;
var query = 'select name,password from tab_register where name ="'+name+'" and password ="'+pass+'" ';
connection.query(query,(err,results,fileds) =>{
    var u = results[0];
    if(!u){
        res.json({"status":-1});
    }else{
        res.json({"status":1});
    }
});
})

module.exports = router;

