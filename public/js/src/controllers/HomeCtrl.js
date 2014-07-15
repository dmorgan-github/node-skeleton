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
		* Represents a Home Controller
		* @class HomeCtrl
		* @constructor
		**/
		app.skeleton.controller(
			'HomeCtrl',
			[
				'$scope',
				'$routeParams',
				function ($scope, $routeParams) {

					/**
					* Initializes the controller
					* @method initialize
					**/
					function initialize() {
					}

					initialize();
				}
			]
		);
	}
);