'use strict';

var debug = require('debug')('api:controllers:api:users');
var User = require('../../lib/domain/models').User;
var logger = require('../../logger');
var enums = require('../../lib/domain').enums;

/**
* @class users
* @module api
*/
module.exports = function (app) {

	var userService = app.services.userService;

	/**
	@method POST /api/users/:id/setpassword
	*/
	app.http.post('/api/users/:id/setpassword',
		function setPassword(req, res) {

			var id = req.params.id;
			var password = req.body.password;

			userService.setPassword(id, password, req.user)
				.then(function () {

					res.send(200);
				})
				.catch(function (err) {

					logger.error(err.stack);
					res.json(500, {message: err.message});
				});
		});

	/**
	@method POST /api/users
	*/
	app.http.post('/api/users',
		function add(req, res) {

			var model = new User(req.body);
			var username = model.username;

			userService.add(model, req.user)
				.then(function (result) {

					res.json(200, result);
				})
				.catch(function (err) {

					logger.error(err.stack);
					if (err.message === 'User already exists') {

						res.json(409, {message: err.message});
					} else {

						res.json(500, {message: err.message});
					}
				});
		});

	/**
	@method GET /api/users
	*/
	app.http.get('/api/users',
		function get(req, res) {

			userService.find({status: enums.DataStatus.active})
				.then(function (result) {

					res.json(200, result);
				})
				.catch(function (err) {

					logger.error(err.stack);
					res.json(500, {message: err.message});
				});
		});

	/**
	@method DELETE /api/users/:id
	*/
	app.http.delete('/api/users/:id',
		function remove(req, res) {

			var id = req.params.id;

			userService.remove(id, req.user)
				.then(function (result) {

					res.json(200, result);
				})
				.catch(function (err) {

					logger.error(err.stack);
					res.json(500, {message: err.message});
				});
		});
};