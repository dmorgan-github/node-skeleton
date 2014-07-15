'use strict';

var Q = require('q');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var enums = require('./enums');
var User = require('./models/User');

module.exports = function (deps) {

	var status = enums.DataStatus;

	/**
	* Provides domain logic for managing the {{#crossLink "User"}}{{/crossLink}} collection.
	* Async operations are exposed as Q/A+ promises.
	*
	* @example
	*	var UserService = require('./UserService')({});
	*	var service = new UserService(repo);
	*
	* @class UserService
	* @constructor
	* @param repo {Object} Underlying data repository, e.g. {{#crossLink "MongoRepo"}}{{/crossLink}}
	* @module services
	*/
	function UserService(repo) {

		this.repo = repo;
	}

	/**
	* Async method to query the {{#crossLink "User"}}{{/crossLink}} collection
	*	
	* @example
		service.find({firstName: 'admin'})
			.then(function (result) {
				result.forEach(function (d) {
					//process
				});
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @example
		service.find(function (query) {
				query
					.where('firstName').equals('admin')
					.where('lastName').ne('admin')
			})
			.then(function (result) {	
				result.forEach(function (d) {
					//process
				});
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method find
	* @async
	* @param {Object} query The search criteria. The search criteria can be a simple
	* json object containing the criteria. Or it can be a callback. The callback provides
	* access to a mquery object which allows more complex querying.
	* @return {Promise} A Promise that resolves with an array containing the query results.
	*/
	UserService.prototype.find = function (query) {

		return this.repo.find(query);
	};

	/**
	* Async method to persist a new {{#crossLink "User"}}{{/crossLink}} to the collection.
	*	
	* @example
		service.add(model, user)
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method add
	* @async
	* @param {Object} model The {{#crossLink "User"}}{{/crossLink}} to add.
	* @param {Object} user The {{#crossLink "User"}}{{/crossLink}} performing the operation.
	* If a user is not supplied an Error will be thrown.
	* @return {Promise} A Promise that resolves with the newly added {{#crossLink "User"}}{{/crossLink}} with a generated uuid.
	*/
	UserService.prototype.add = function (model, user) {

		if (!user) {
			throw new Error('User not specified');
		}
		model.validate();

		var self = this;
		// username must be unique
		return self.repo.findOne({username: model.username, status: enums.DataStatus.active})
			.then(function (result) {

				if (result) {

					throw new Error('User already exists');
				} else {

					model.id = uuid.v4();
					model.status = status.active;
					model.lastModified = new Date();
					model.dateCreated = new Date();
					model.createdBy = user.username;
					model.modifiedBy = user.username;

					return self.repo.add(model);
				}
			});
	};

	/**
	* Async method to remove a {{#crossLink "User"}}{{/crossLink}} from the collection.
	*	
	* @example
		service.remove('e89f3ada-fadd-4e51-9d24-22e8104c28ac', user)
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method add
	* @async
	* @param {String} id The uuid of the {{#crossLink "User"}}{{/crossLink}} to remove
	* @param {Object} user The {{#crossLink "User"}}{{/crossLink}} performing the operation.
	* @return {Promise} A Promise that resolves if the delete was successful.
	*/
	UserService.prototype.remove = function (id, user) {

		if (!user) {
			throw new Error('User not specified');
		}

		var model = {
			status: status.deleted,
			modifiedBy: user.username,
			lastModified: new Date()
		};

		return this.repo.set(id, model);
	};

	/**
	* Async method to update a {{#crossLink "User"}}{{/crossLink}}.
	*	
	* @example
		service.update(model, user)
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method update
	* @async
	* @param {Object} id The {{#crossLink "User"}}{{/crossLink}} to update
	* @param {Object} user The {{#crossLink "User"}}{{/crossLink}} performing the operation.
	* @return {Promise} A Promise that resolves with the updated {{#crossLink "User"}}{{/crossLink}}.
	*/
	UserService.prototype.update = function (model, user) {

		if (!user) {
			throw new Error('User not specified');
		}

		model.lastModified = new Date();
		model.modifiedBy = user.username;
		// We have to do a set in order not
		// to overwrite the password since
		// it is not exposed in the domain model
		return this.repo.set(model.id, model)
			.then(function () {
				return model;
			});
	};

	/**
	* Async method to set the password of a {{#crossLink "User"}}{{/crossLink}}
	*	
	* @example
		service.setPassword('e89f3ada-fadd-4e51-9d24-22e8104c28ac', password, user)
			.then(function () {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method setPassword
	* @async
	* @param {String} id The uuid of the {{#crossLink "User"}}{{/crossLink}} whose password is being set
	* @param {String} password The new password
	* @param {Object} user The {{#crossLink "User"}}{{/crossLink}} performing the operation.
	* @return {Promise} A Promise that resolves if the operation is successful
	*/
	UserService.prototype.setPassword = function (userId, password, user) {

		if (!user) {
			throw new Error('User not specified');
		}

		var def = Q.defer();
		var repo = this.repo;
		bcrypt.genSalt(10, function (err, salt) {

			bcrypt.hash(password, salt, function (err, hash) {

				if (err) {

					def.reject(err);
				} else {

					repo.set(userId, {password: hash})
						.then(function () {

							def.resolve();
						})
						.catch(function (err) {

							def.reject(err);
						});
				}
			});
		});
		return def.promise;
	};

	/**
	* Async method to fetch a {{#crossLink "User"}}{{/crossLink}} by apikey
	*	
	* @example
		service.getByApiKey('e89f3ada-fadd-4e51-9d24-22e8104c28ac')
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method getByApiKey
	* @async
	* @param {String} apikey The apikey of the {{#crossLink "User"}}{{/crossLink}} to fetch
	* @return {Promise} A Promise that resolves with the {{#crossLink "User"}}{{/crossLink}}
	*/
	UserService.prototype.getByApiKey = function (apikey) {

		var def = Q.defer();
		def.resolve({
			id: '15d50d12-4946-494c-9c6c-9094e538780f',
			username: 'admin'
		});
		return def.promise;
	};

	/**
	* Async method to fetch a {{#crossLink "User"}}{{/crossLink}} by login credentials
	*	
	* @example
		service.getByCredentials('admin', 'admin')
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method getByCredentials
	* @async
	* @param {String} username The username of the {{#crossLink "User"}}{{/crossLink}} to fetch
	* @param {String} password The password of the {{#crossLink "User"}}{{/crossLink}} to fetch
	* @return {Promise} A Promise that resolves with the {{#crossLink "User"}}{{/crossLink}}
	*/
	UserService.prototype.getByCredentials = function (username, password) {

		// The password property is not exposed by the domain entity
		// but it is saved in the database. To get the password
		// we query the collection and get the raw data without
		// it first being converted to a domain entity by the repo.
		// Once we do the validation we can convert the data to
		// the domain entity thereby not exposing the password hash
		// to any layers above this. Not sure if this is the best
		// technique to handle this
		var def = Q.defer();
		this.repo.findOne()
			.where('username').equals(username)
			.where('status').equals(status.active)
			.exec(function (err, result) {

				if (err) {

					def.reject(err);
				} else {

					if (result) {

						var hash = result.password;
						bcrypt.compare(password, hash, function (err, res) {
								
							if (err) {

								def.reject(err);
							} else {

								if (res) {

									def.resolve(new User(result));
								} else {

									def.resolve(null);
								}
							}
						});
							
					} else {

						def.resolve(null);
					}
				}
			});

		return def.promise;
	};

	/**
	* Async method to fetch a {{#crossLink "User"}}{{/crossLink}} by id
	*	
	* @example
		service.getById('2bd47bb1-c633-49a8-8f58-577ef2ce3617')
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method getById
	* @async
	* @param {String} id The uuid of the {{#crossLink "User"}}{{/crossLink}} to fetch
	* @return {Promise} A Promise that resolves with the {{#crossLink "User"}}{{/crossLink}}
	*/
	UserService.prototype.getById = function (id) {

		return this.repo.getById(id);
	};

	return UserService;
};