'use strict';

var util = require('util');
var debug = require('debug')('api:runtime:auth');
var express = require('express');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;
var logger = require('../logger');

exports.attach = function (options) {

	debug('attaching auth...');
	debug(JSON.stringify(options));
	var enforceApiKey = options.enforceApiKey;

	var self = this;
	passport.use(new LocalAPIKeyStrategy(function (apikey, done) {

		var key = util.format('apikey:%s', apikey);
		self.services.cacheService
			.getOrAdd(key, function () { return self.services.userService.getByApiKey(apikey); })
			.then(function (result) {

				if (result) {

					debug('found user: %s', JSON.stringify(result));
					done(null, result);
				}
				else {

					done(new Error('Invalid apikey'));
				}
			})
			.catch(function (err) {

				logger.error(err.stack);
				done(err);
			});

	}));

	passport.use(new LocalStrategy(

		function (username, password, done) {

			debug('LocalStrategy.verify->' + username);
			self.services.userService.getByCredentials(username, password)
				.then(function (result) {

					if (result) {

						done(null, result);
					} else {

						done(null, false, {message: 'Invalid credentials'});
					}
				})
				.catch(function (err) {

					logger.error(err.stack);
					done(null, false, {message: 'An error ocurred'});
				});
		}
	));

	passport.serializeUser(function (user, done) {

		debug('serializeUser->' + user.id);
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {

		debug('deserializeUser->id->' + id);

		var key = util.format('user:%s', id);
		self.services.cacheService
			.getOrAdd(key, function () { return self.services.userService.getById(id); })
			.then(function (result) {

				if (result) {

					debug('found user: %s', JSON.stringify(result));
					done(null, result);
				}
				else {

					debug('did not find user in cache or db -> ' + id);
					done(null, false, {message: 'Invalid user'});
				}
			})
			.catch(function (err) {

				done(err);
			});
	});

	function authenticate() {

		return function (req, res, next) {

			if (req.isAuthenticated()) {
				debug('request is authenticated');

				if (req.originalUrl === '/logout') {

					debug('logging out...');
					req.session = null;
				}

				next();
			} else {

				debug('request not authenticated');
				if (req.originalUrl.indexOf('/api') === 0) {

					debug('request is for api');
					if (enforceApiKey) {

						passport.authenticate('localapikey', {session: false})(req, res, next);
					} else {

						req.user = {
							id: '15d50d12-4946-494c-9c6c-9094e538780f',
							username: 'admin'
						};
						next();
					}
				} else {

					debug('request is for ui');
					if (req.originalUrl === '/') {

						debug('request is for login');
						next();
					} else {

						if (req.originalUrl === '/login') {

							passport.authenticate('local', {
								failureRedirect: '/',
								successRedirect: '/admin',
								failureFlash: true
							})(req, res, next);

						} else {

							res.redirect('/');
						}
					}
				}
			}
		};
	}

	var http = this.http;
	http.use(express.cookieParser());

	//http.use(express.session({ secret: 'keyboard cat' }));
	http.use(express.cookieSession({ secret: 'keyboard cat', cookie: { maxAge: 60 * 60 * 1000 }}));

	http.use(flash());
	http.use(passport.initialize());
	http.use(passport.session());
	http.use(authenticate());

};

// `exports.init` gets called by broadway on `app.init`.
exports.init = function (done) {

	// This plugin doesn't require any initialization step.
	return done();
};