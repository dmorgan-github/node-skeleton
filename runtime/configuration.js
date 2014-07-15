'use strict';

var path = require('path');
var debug = require('debug')('api:runtime:configuration');
var nconf = require('nconf');

// Setup nconf to use (in-order) command-line arguments,
// environment variables and configuration file.
nconf.argv().env();
var env = nconf.get('NODE_ENV') || 'dev';

var configFile = path.join(__dirname, '/../config/config-' + env + '.json');
nconf.file({file: configFile});
nconf.set('env:env', env);

var pkg = require('../package.json');
nconf.set('env:version', pkg.version);

// `exports.attach` gets called by broadway on `app.use`
exports.attach = function (options) {

	debug('attaching configuration...');
	this.configuration = nconf;
};

// `exports.init` gets called by broadway on `app.init`.
exports.init = function (done) {

	// This plugin doesn't require any initialization step.
	return done();
};