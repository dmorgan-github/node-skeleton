'use strict';

var path = require('path');
var express = require('express');
var dustjs = require('adaro');
var debug = require('debug')('api:runtime:http');
var routes = require('../controllers');
var logger = require('../logger');

// Express configuration.
var app = express();

exports.attach = function (options) {

	debug('attaching http');

	var config = this.configuration;

	// middleware.
	if (config.get('env:env') === 'dev') {
		app.use(express.logger());
	}
	
	app.use(express.favicon());
	app.use(express.bodyParser({limit: '50mb'}));
	app.engine('dust', dustjs.dust({ cache: false }));
	app.set('view engine', 'dust');
	app.use(express.static(path.join(__dirname, '/../public')));
	app.disable('x-powered-by');
	app.disable('etag');
	
	this.http = app;

	this.handleRoutes = function () {
		
		debug('applying routes');
		this.http.use(this.http.router);
		routes(this);
	};

	this.handleErrors = function () {

		// 404 handler
		this.http.use(function (req, res, next) {
			
			debug('404 error');
			res.send(404);
		});

		this.http.use(function (err, req, res, next) {

			logger.error(err.stack);
			var model = { url: req.url, err: err.message };
			res.send(500, model);
		});
	};
};

// `exports.init` gets called by broadway on `app.init`.
exports.init = function (done) {

	return done();
};