'use strict';

var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('api:runtime:shutdown');
var logger = require('../logger');

exports.attach = function (options) {

	var self = this;
	// listen for TERM signal .e.g. kill 
	process.on('SIGTERM', function () {

		debug('kill signal...');
		self.emit('shutdown');
	});

	// listen for INT signal e.g. Ctrl-C
	process.on('SIGINT', function () {

		debug('ctrl-c...');
		self.emit('shutdown');
	});

	if (!EventEmitter.listenerCount(process, 'uncaughtException')) {

		process.on('uncaughtException', function (err) {

			logger.error(new Date().toUTCString(), 'uncaughtException', err.message);
			logger.error(err.stack);
			self.emit('shutdown');
		});
	}

	self.forceShutdown = function () {

		setTimeout(function () {

			debug('forcing shutdown...');
			process.exit();
		}, 10 * 1000);
	};
};

// `exports.init` gets called by broadway on `app.init`.
exports.init = function (done) {

	// This plugin doesn't require any initialization step.
	return done();
};