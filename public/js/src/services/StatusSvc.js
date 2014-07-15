define(
	[
		'app',
		'angular',
		'underscore',
		'jquery',
		'log'
	],
	function (app, angular, _, $, log) {
		'use strict';

		/**
		The service for status data
		@class SearchSvc
		@return {Object} Returns the current instance
		**/
		app.skeleton.factory(
			'StatusSvc',
			[
				'$http',
				function ($http) {

					var resource = {

						/**
						@method get fetches status data from endpoint
						@return {Object} Returns an async callback
						**/
						get: function (query) {

							return $http.get('/api/status');
						}
					};

					return resource;
				}
			]
		);
	}
);
