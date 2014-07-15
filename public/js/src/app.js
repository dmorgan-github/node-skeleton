define(
	[
		'log',
		'jquery',
		'underscore',
		'angular',
		'angularRoute',
		'angularGrid',
		'angularBootstrap',
		'angularSanitize',
		'angularGrowl'
	],
	function (log, $, _, angular) {
		'use strict';

		var app = {

			skeleton: angular.module('skeleton', ['ngRoute', 'ngGrid', 'ui.bootstrap', 'ngSanitize', 'angular-growl']),

			init: function () {
				angular.bootstrap(document, ['skeleton']);
			}
		};

		app.skeleton.config(['growlProvider', function (growlProvider) {
			growlProvider.globalEnableHtml(true);
		}]);

		return app;
	}
);

