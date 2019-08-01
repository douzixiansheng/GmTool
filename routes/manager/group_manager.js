var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
  console.log("aaaaaaaa");
  res.render('manager/group_manager');
});


router.get('/testRouter',function(req, res){
  console.log("test.....");
  res.send({msg:'ok'});
})

module.exports = router;