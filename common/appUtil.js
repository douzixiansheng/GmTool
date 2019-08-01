'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var Constants = require('../common/constants');
// 载入所有的系统
module.exports.loadAllSystems = function (app) {
	let dir = app.baseDir + '/systems';
	
	fs.readdirSync(dir).forEach(function(filename) {
		let name = path.basename(filename, '.js');

		if (fs.lstatSync(dir + '/' + filename).isDirectory()) {
			return;
		}

		app.systems[name] = require(dir + '/' + name)(app);
	});
};