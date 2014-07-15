'use strict';

/**
* Domain services
* These objects provide domain logic and processing.
*
* @module services
*/

/**
* Adapters and clients
* These objects provide technology specific implementations.
*
* @module infrastructure
*/

/**
* Domain entities
*
* @module models
*/

/**
* Http service API
*
* @module api
*/

var http = require('http');
var debug = require('debug')('api');
var broadway = require('broadway');
var logger = require('./logger');

debug('api initializing...');

var app = new broadway.App();
require('pkginfo')(module, 'version');

app.use(require('./runtime/configuration'));
app.use(require('./runtime/services'));
app.use(require('./runtime/http'));
app.use(require('./runtime/auth'), {enforceApiKey: false});
app.use(require('./runtime/shutdown'));
app.use(require('./runtime/logo'));

app.init(function (err) {

	if (err) {

		debug(err.stack);
		logger.error(err.stack);
	} else {

		app.handleRoutes();
		app.handleErrors();

		var port = app.configuration.get('PORT');
		var server = http.createServer(app.http)
			.listen(port, function () {
				app.printLogo();
				debug('Listening on port ' + port);
			});

		app.on('shutdown', function () {

			app.forceShutdown();
			if (server) {

				debug('closing connections...');
				server.close(function () {

					debug('Connections closed. Exiting.');
					process.exit();
				});
			}
		});

		app.dateStarted = new Date();
		debug('api started');
	}
});

module.exports = app;