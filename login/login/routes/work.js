var express = require ('express');
var router = express.Router();

router.get('/',(req,res) =>{
    res.render('work');
});

module.exports = router;