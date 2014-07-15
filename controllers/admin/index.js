'use strict';
var debug = require('debug')('api:controllers:admin:index');
var passport = require('passport');

module.exports = function (app) {

	var config = app.configuration;
	var env = config.get('env:env');
	var version = config.get('env:version');

	function login(req, res, next) {

		debug('user logged in');
		res.redirect('/admin');
	}

	function logout(req, res, next) {

		debug('user logging out');
		res.render('login', {env: env, version: version});
	}

	app.http.get('/', function (req, res) {

		var msg = req.flash('error');
		res.render('login', {message: msg, env: env, version: version});
	});

	app.http.post('/login', login);
	app.http.get('/logout', logout);

	require('./admin')(app);
};