var express = require('express');
var router = express.Router();

router.get('/right', function(req, res, next){
    var url = req.originalUrl;
    console.log("XXX ",url.replace(/^\//,''));
    res.render('right');
  });

  module.exports = router;