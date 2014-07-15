'use strict';

var Q = require('q');
var $_ = require('underscore');
var debug = require('debug')('api:lib:infrastructure:InMemoryCacheClient');
var NodeCache = require('node-cache');

module.exports = function (deps) {

	var cache = new NodeCache();

	/**
	* Provides in-memory caching.
	* Async operations are exposed as Q/A+ promises.
	*
	* @example
	*	var InMemoryCacheClient = require('./InMemoryCacheClient')();
	*	var cacheClient = new InMemoryCacheClient();
	*	
	* @class InMemoryCacheClient
	* @constructor
	* @module infrastructure
	*/
	function InMemoryCacheClient() {

	}

	/**
	* Async method to get a value from the cache or add
	* it if it is not present.
	*	
	* @example
	*	cacheClient.getOrAdd('user:2bd47bb1-c633-49a8-8f58-577ef2ce3617', function () {
	*			return services.getUserById(id);
	*		})
	*		.then(function (result) {
	*
	*			//item retrieved from cache
	*		})
	*		.catch(function (err) {
	*			console.log(err.stack);
	*		});
	*
	* @method getOrAdd
	* @async
	* @param {String} key The cache key
	* @param {Function} func The function to execute if no value for the key
	* is in the cache. The delegate should return a Q/A+ Promise
	* that will resolve with the value to cache.
	* @return {Promise} A Promise that resolves with the cached item.
	*/
	InMemoryCacheClient.prototype.getOrAdd = function (key, func) {

		var self = this;
		return self.get(key)
			.then(function (result) {

				if (result) {

					return result;
				} else {

					debug('executing promise');
					return func()
						.then(function (result) {

							debug('obtained result from promise');
							return self.put(key, result);
						});
				}
			});
	};

	/**
	* Async method to get a value from the cache
	*	
	* @example
	*	cacheClient.get('user:2bd47bb1-c633-49a8-8f58-577ef2ce3617')
	*		.then(function (result) {
	*
	*			//item retrieved from cache
	*		})
	*		.catch(function (err) {
	*			console.log(err.stack);
	*		});
	*
	* @method get
	* @async
	* @param {String} key The cache key
	* @return {Promise} A Promise that resolves with the cached item.
	* If the key is not in the cache the Promise will resolve with a null value.
	*/
	InMemoryCacheClient.prototype.get = function (key) {

		var def = Q.defer();
		cache.get(key, function (err, result) {

			if (err) {

				def.reject(err);
			} else {

				if ($_.isEmpty(result)) {

					debug('cache miss: %s', key);
					def.resolve(null);
				} else {

					debug('cache hit: %s', key);
					def.resolve(result);
				}
			}
		});
		return def.promise;
	};

	/**
	* Async method to add a value to the cache
	*	
	* @example
	*	cacheClient.put('user:2bd47bb1-c633-49a8-8f58-577ef2ce3617', {id: '2bd47bb1-c633-49a8-8f58-577ef2ce3617'})
	*		.then(function (result) {
	*
	*			//item added to the cache
	*		})
	*		.catch(function (err) {
	*			console.log(err.stack);
	*		});
	*
	* @method put
	* @async
	* @param {String} key The cache key
	* @param {Object} val The value to cache
	* @return {Promise} A Promise that resolves with the cached value.
	*/
	InMemoryCacheClient.prototype.put = function (key, val) {

		var def = Q.defer();
		cache.set(key, val, function (err, success) {

			if (err) {

				def.reject(err);
			} else {

				if (success) {

					debug('add key %s to cache', key);
					def.resolve(val);
				} else {

					def.reject(new Error('Unalbe to add cache'));
				}
			}
		});

		return def.promise;
	};

	return InMemoryCacheClient;
};