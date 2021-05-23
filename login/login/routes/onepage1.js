var express = require ('express');
var router = express.Router();

router.get('/',(req,res) =>{
    res.render('onepage1');
});

module.exports = router;