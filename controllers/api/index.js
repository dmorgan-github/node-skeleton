'use strict';

module.exports = function (app) {

	// initialize api routes
	require('./users')(app);
};
