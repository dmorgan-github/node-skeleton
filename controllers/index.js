'use strict';

module.exports = function (app) {

	// initialize api routes
	require('./api')(app);
	// initialize admin routes
	require('./admin')(app);
};