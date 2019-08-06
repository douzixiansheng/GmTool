var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);
//var logger = require('morgan');

var log4js = require('log4js');
var logger = require('./common/logger').getLogger('app');
var loadroute = require('./autoLoadRouter');
var redisConfig = require('./common/redisConfig');
redisConfig.init();

//生成一个express实例app
//app 是express 框架所构建程序的请求处理入口，app可作为顶层路由器使用
//在应用中也可挂载下级路由器(使用router对象)以实现分级路由
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * 每个use生成一个Layer，push到app的内部router的stack中
 *
 * app -> 主要负责全局配置参数读取
 * router ->
 * layer -> 请求分发对象
 * route -> 最底层的对象，负责处理请求
 *
 * app.use 和  app.get  的区别
 *
 * app.use(path,callback)中的callback既可以是router对象也可以是函数
 * app.get(path,callback)中的callback只能是函数
 */
app.use(log4js.connectLogger(logger, {level: 'info'}));
//app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('sessiontest'));
app.use(express.static(path.join(__dirname, 'public')));


//创建Redis客户端
var redisClient = redisConfig.getRedis('global');

app.use(session({
  cookie: {
    maxAge: 80000
  },
  store: new RedisStore({client: redisClient}),
  //一个String类型的字符串，作为服务器端生成session的签名
  secret: 'sessiontest',//与cookieParser中的一致
  //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时
  //对session进行修改覆盖并
  resave: false,
  saveUninitialized: false
}));
loadroute(app,"","./routes");

// catch 404 and forward to erroz`r handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("error ",req.route);
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/**
 * 为什么使用session
 * session运行在服务器端，当客户端第一次访问服务器时，可以将客户的登录信息保存。
 * 当客户访问其他页面时，可以判断客户的登录状态，做出提示，相当于登录拦截.
 * 
 * session 工作流程：
 * 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成类型
 * 于key,value的键值对，然后将key(cookie)返回到浏览器(客户)端，浏览器下次访问时，
 * 携带key(cookie),找到对应的session(value).
 */