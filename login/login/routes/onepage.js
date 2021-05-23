var express = require ('express');
var router = express.Router();

router.get('/',(req,res) =>{
    res.render('onepage');
});

router.post('/',(req,res) =>{
    res.json({"status":1});
})
module.exports = router;