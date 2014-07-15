'use strict';
var debug = require('debug')('api:controllers:admin:admin');

module.exports = function (app) {

	var config = app.configuration;
	var env = config.get('env:env');
	var version = config.get('env:version');

	app.http.get('/admin', function (req, res) {

		debug('render admin');
		res.render('admin', {env: env, version: version});
	});
};