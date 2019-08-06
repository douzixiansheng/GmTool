var express = require('express');
var router = express.Router();
var logger = require('../common/logger').getLogger('index', __dirname);
var redisClient = require('../common/redisConfig').getRedis('global');
var Model = require('../model/login');
/**
 * routes 下文件的名称必须与views的名称一致  便于添加路由
 * res.render 为ejs文件的名称
 */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: '运营管理系统' });
});

// 接受index.js 的数据
router.post('/', async function(req, res){
  let userName = req.body.login;
  let userPwd = req.body.password;

  req.session.user = {'name':userName};

  let accountInfo = await Model.getAccount(redisClient, "gm_tool_admin");
  console.log(accountInfo)
  if(!accountInfo || !accountInfo.account || !userName || !userPwd){
    res.render('message',{title:'运营管理系统',name:req.session.user.name || 'admin',time: 10});
    return;
  }
  res.render('index',{title:"运营管理系统",name: req.session ? req.session.user.name : 'admin'});
});

router.get('/right', function(req, res, next){
  res.render('right');
});

router.get('/message', function(req, res){
  res.render('message',{title:'xxx'});
});

module.exports = router;

