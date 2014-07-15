'use strict';

var debug = require('debug')('api:runtime:logo');


// `exports.attach` gets called by broadway on `app.use`
exports.attach = function (options) {

	debug('attaching logo...');
	this.printLogo = function () {
		console.log('logo');
	};
};

// `exports.init` gets called by broadway on `app.init`.
exports.init = function (done) {

	// This plugin doesn't require any initialization step.
	return done();
};