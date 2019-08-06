'use strict';
const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/right', function(req, res, next){
    var url = req.originalUrl;
    console.log("XXX ",url.replace(/^\//,''));
    res.render('right');
});

router.get('/leftInformation', function(req, res, next){
  let info = {};
  info.hostname = os.hostname();//主机
  info.platform = os.platform();//平台
  info.arch = os.arch();//架构
  console.log(info);
  res.send({"msg":"success","info":info});
})

module.exports = router;