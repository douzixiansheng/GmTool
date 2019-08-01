var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("我的测试demo", req.path, req.session);
  res.render('main', { title: '我的测试demo' });
});

router.get("/logout",function(req, res, next){
  //删除session
  req.session.user = null;
  res.redirect('/');
});
module.exports = router;