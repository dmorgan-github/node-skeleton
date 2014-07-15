define(
	[
		'app',
		'log',
		'angular',
		'controllers/HomeCtrl'
	],
	function (app, log) {
		'use strict';

		var router = app.skeleton.config(
			[
				'$routeProvider',
				'$locationProvider',
				function ($routeProvider, $locationProvider) {

					$locationProvider.hashPrefix('!');

					// Routes.
					$routeProvider
						// home.
						.when('/home', {
							templateUrl: 'templates/admin.html',
							controller: 'HomeCtrl'
						})
						.otherwise({
							redirectTo: '/home'
						}
					);
				}
			]);

		return router;
	}
);