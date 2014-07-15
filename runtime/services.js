'use strict';

var debug = require('debug')('api:runtime:services');
var MongoClient = require('mongodb').MongoClient;
var infrastructure = require('../lib/infrastructure');
var domain = require('../lib/domain');
var models = require('../lib/domain/models');
var repositories = require('../lib/infrastructure/repositories');

function getUserService(db) {

	var collection = 'users';
	var Model = models.User;
	var Repo = repositories.MongoRepo({db: db});
	var repo = new Repo(collection, Model);

	var Service = domain.UserService({});
	return new Service(repo);
}

function getMetadataEnricher(nconf) {

	var deps = {
		'serverRoot': nconf.get('serverRoot')
	};

	var Enricher = domain.MetadataEnricher(deps);
	return new Enricher();
}

function getCacheClient() {

	var deps = {};
	var Client = infrastructure.InMemoryCacheClient(deps);
	return new Client();
}

exports.attach = function (options) {

	debug('attaching services');
	this.services = {};
};

exports.init = function (done) {

	debug('initializing services');
	var nconf = this.configuration;
	var uri = nconf.get('mongoUri');

	var self = this;

	MongoClient.connect(uri, function (err, db) {

		if (err) {

			debug(err.stack);
			done(err);
		} else {

			self.services.metadataEnricher = getMetadataEnricher(nconf);
			self.services.userService = getUserService(db);
			self.services.cacheService = getCacheClient();

			debug('services initialized');
			done();
		}
	});
};