/*
* 日志功能
*/

'use strict';

var log4js = require('log4js');
var os = require('os');

// 获取日志功能
function getLogger(categoryName) {
	let args = arguments;
	let prefix = '';
	let pLogger = {};
	let logger = log4js.getLogger(categoryName);
	
	for (let i = 1; i < args.length; ++i) {
		if (i !== args.length - 1) {
			prefix = prefix + args[i] + '][';
		} else {
			prefix = prefix + args[i];
		}
	}

	for (let key in logger) {
		pLogger[key] = logger[key];
	}

	['log', 'debug', 'info', 'warn', 'error', 'trace', 'fatal'].forEach(function (item) {
		pLogger[item] = function () {
			let p = '';
			if (args.length > 1) {
				p = '[' + prefix + ']';
				p = p + '[line:' + getLine() + '] ';
			}

			if (args.length) {
				arguments[0] = p + arguments[0];
			}

			logger[item].apply(logger, arguments);
		}
	});
	return pLogger;
};

function getLine() {
	let e = new Error();
	let idx = os.platform() === 'win32' ? 2 : 1;
	let line = e.stack.split('\n')[3].split(':')[idx];

	return line;
};

module.exports = {
	getLogger: getLogger
};