var fs = require('fs');
var Promise = global.Promise || require('es6-promise').Promise;
Promise.any = require('promise-any-ext');
var parsers = require('./lib/parsers.js');

module.exports = function (file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, function (err, contents) {
			if (err) return reject();
			
			Promise.any(parsers(contents)).then(function(result) {
				resolve(result);
			}, reject);
		});
	});
};