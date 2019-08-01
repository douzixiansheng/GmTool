'use strict';

var redis = require('redis');
var rs = require('../config/redis');

var System = {};

System.init = function(){
    this.redis = {};

    for(let k in rs){
        this.redis[k] = redis.createClient(rs[k].port, rs[k].ip, {auth_pass: rs[k].password});
    }
}

System.getRedis = function(name){
    return this.redis[name];
}

module.exports = System;