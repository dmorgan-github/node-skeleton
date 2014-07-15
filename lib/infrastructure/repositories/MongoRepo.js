'use strict';

var Q = require('q');
var mquery = require('mquery');
var $_ = require('underscore');
var debug = require('debug')('api:lib:infrastructure:repositories:MongoRepo');

module.exports = function (deps) {

	// the connection pool
	var db = deps.db;

	/**
	* Provides data access to a Mongo collection.
	* The module exports a function through which the Mongo connection pool can be provided.
	* Async operations are exposed as Q style promises.
	*
	* @example
		// Inject the current Mongo connection
		var MongoRepo = require('./MongoRepo')({db : db});
		var repo = new MongoRepo('attachments', Attachment);
	*
	* @class MongoRepo
	* @constructor
	* @param {String} collectionName Mongo collection name
	* @param {Object} Model Constructor function for the domain entity, e.g. {{#crossLink "Attachment"}}{{/crossLink}}
	* @module infrastructure
	*/
	function MongoRepo(collectionName, Model) {

		this.collectionName = collectionName;
		this.Model = Model;
	}

	/**
	* Async method to persist a new entity to the underlying Mongo collection.
	*	
	* @example
		repo.add(model)
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method add
	* @async
	* @param {Object} model The domain entity to add to the collection, e.g. {{#crossLink "Attachment"}}{{/crossLink}}
	* @return {Promise} A Promise that resolves with the newly added entity.
	*/
	function add(model) {

		var def = Q.defer();
		/*jshint validthis:true */
		var collectionName = this.collectionName,
			Model = this.Model;

		var collection = db.collection(collectionName);
		// TODO: not sure if this is the best technique
		// to encapsulate the mongo _id field
		var id = model.id;
		delete model.id;
		model._id = id;

		//writes are acknowledged by default
		//http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
		collection.insert(model, function (err, models) {

			if (err) {

				def.reject(err);
			} else {

				model.id = id;
				delete model._id;
				def.resolve(model);
			}
		});

		return def.promise;
	}

	/**
	* Async method to update (i.e. __replace__) an entity in the underlying Mongo collection.
	*	
	* @example
		repo.update(model)
			.then(function (result) {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method update
	* @async
	* @param {Object} model The domain entity to update. 
	* @return {Promise} A Promise that resolves with the updated entity.
	*/
	function update(model) {

		if (!model.id) {

			throw new Error('Model must contain an id property');
		}

		var def = Q.defer();
		/*jshint validthis:true */
		var collectionName = this.collectionName,
			Model = this.Model;

		var collection = db.collection(collectionName);
		// we don't want to persist the id property
		// in the database
		var id = model.id;
		delete model.id;
		//writes are acknowledged by default
		//http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
		collection.update({_id: id}, model, function (err) {

			if (err) {

				def.reject(err);
			} else {

				model.id = id;
				def.resolve(model);
			}
		});
		return def.promise;
	}

	/**
	* Async method to update properties of an entity in the underlying Mongo collection.
	*	
	* @example
		repo.set('092cd254-8e57-4273-b904-ffb3933b6df2', vals)
			.then(function () {
				// process
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method set
	* @async
	* @param {String} id The id of the entity to update. The id can either be the uuid of the resource
	* to update or it can be search criteria that will return a single document. 
	* @param {Object} vals The values to update. 
	* @return {Promise} A Promise that resolves if the update is successful. The updated model is not returned.
	*/
	function set(id, vals) {

		var def = Q.defer();
		var query;
		if ($_.isObject(id)) {

			query = id;
		} else {

			query = {_id: id};
		}
		
		/*jshint validthis:true */
		var collectionName = this.collectionName;
		var collection = db.collection(collectionName);
		//writes are acknowledged by default
		//http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
		collection.update(query, {$set: vals}, function (err) {

			if (err) {

				def.reject(err);
			} else {

				def.resolve();
			}
		});
		return def.promise;
	}

	/**
	* Async method to query the underlying Mongo collection.
	*	
	* @example
		repo.find({state: 'florida'})
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
		repo.find(function (query) {
				query
					.where('state').equals('florida')
					.where('county').ne('miamidade')
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
	function find(query) {

		/*jshint validthis:true */
		var collectionName = this.collectionName,
			Model = this.Model;
		var returnVal = [];

		var collection = db.collection(collectionName);
		var mq;

		if (query) {

			if ($_.isFunction(query)) {

				mq = mquery(collection).find();
				query(mq);
			} else {

				mq = mquery(collection).find(query);
			}

		} else {

			return mquery(collection).find();
		}

		var def = Q.defer();
		mq.exec(function (err, result) {

			if (err) {

				def.reject(err);
			} else {

				result.forEach(function (d) {
					returnVal.push(new Model(d));
				});

				def.resolve(returnVal);
			}
		});

		return def.promise;
	}

	/**
	* Async method to query the underlying Mongo collection for a single entity.
	*	
	* @example
		repo.findOne({username: 'admin'})
		.then(function (result) {
				//process result
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @example
		repo.findOne(function (query) {
				query
					.where('username').equals('admin')
			})
			.then(function (result) {	
				//process result
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method findOne
	* @async
	* @param {Object} query The search criteria. The search criteria can be a simple
	* json object containing the criteria. Or it can be a callback. The callback provides
	* access to a mquery object which allows more complex querying.
	* @return {Promise} A Promise that resolves with the query result.
	*/
	function findOne(query) {

		/*jshint validthis:true */
		var collectionName = this.collectionName,
			Model = this.Model;
		var returnVal = [];

		var collection = db.collection(collectionName);
		var mq;

		if (query) {

			if ($_.isFunction(query)) {

				mq = mquery(collection).findOne();
				query(mq);
			} else {

				mq = mquery(collection).findOne(query);
			}

		} else {

			// custom query
			return mquery(collection).findOne();
		}

		var def = Q.defer();
		mq.exec(function (err, result) {

			if (err) {

				def.reject(err);
			} else {

				if (result) {

					var model = new Model(result);
					def.resolve(model);
				} else {
					
					def.resolve(null);
				}
				
			}
		});
		return def.promise;
	}

	/**
	* Async method to fetch an entity from the underlying Mongo collection by id
	*	
	* @example
		repo.getById('e89f3ada-fadd-4e51-9d24-22e8104c28ac')
			.then(function (result) {
				//process result
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method getById
	* @async
	* @param {String} id The uuid of the entity to fetch
	* @return {Promise} A Promise that resolves with the entity
	*/
	function getById(id) {

		var def = Q.defer();
		/*jshint validthis:true */
		var collectionName = this.collectionName,
			Model = this.Model;

		var collection = db.collection(collectionName);
		collection.findOne({_id: id}, function (err, result) {

			if (err) {

				def.reject(err);
			} else {

				var model = new Model(result);
				def.resolve(model);
			}
		});

		return def.promise;
	}

	/**
	* Async method to remove an entity from the underlying Mongo collection by id.
	*	
	* @example
		repo.remove('e89f3ada-fadd-4e51-9d24-22e8104c28ac')
			.then(function (result) {
				//process result
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method remove
	* @async
	* @param {String} id The uuid of the entity to remove
	* @return {Promise} A Promise that resolves with the number of records removed
	*/
	function remove(id) {

		if (!id) {
			throw new Error('id is required');
		}

		var def = Q.defer();
		/*jshint validthis:true */
		var collectionName = this.collectionName;
		var collection = db.collection(collectionName);
		collection.remove({_id: id}, function (err, numberRemoved) {

			if (err) {

				def.reject(err);
			} else {

				def.resolve(numberRemoved);
			}
		});

		return def.promise;
	}

	/**
	* Async method to ping the underlying Mongo database
	*	
	* @example
		repo.ping()
			.then(function (result) {
				//process result
			})
			.catch(function (err) {
				console.log(err.stack);
			});
	*
	* @method ping
	* @async
	* @return {Promise} A Promise that resolves with the ping status
	*/
	function ping() {

		var def = Q.defer();
		db.command({ping: 1}, function (err, result) {

			if (err) {
				def.reject(err);
			} else {
				def.resolve(result);
			}
		});

		return def.promise;
	}

	MongoRepo.prototype = {
		add: add,
		update: update,
		getById: getById,
		find: find,
		findOne: findOne,
		ping: ping,
		remove: remove,
		set: set
	};

	return MongoRepo;
};
