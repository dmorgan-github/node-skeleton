// Require Configuration.
requirejs.config({
	paths: {
		log: '../../components/log/log',
		jquery: '../../components/jquery/dist/jquery',
		angular: '../../components/angular/angular',
		angularRoute: '../../components/angular-route/angular-route',
		angularSanitize: '../../components/angular-sanitize/angular-sanitize',
		angularGrid: '../../components/angular-grid/ng-grid-2.0.7.debug',
		angularBootstrap: '../../components/angular-bootstrap/ui-bootstrap-tpls',
		bootstrap: '../../components/bootstrap/dist/js/bootstrap',
		underscore: '../../components/underscore/underscore',
		angularGrowl: '../../components/angular-growl/build/angular-growl',
		moment: '../../components/momentjs/moment',
		highcharts: '../../components/highcharts-release/highcharts-all'
	},
	shim: {
		'jquery': {
			deps: [],
			exports: 'jquery',
			init: function () {
				'use strict';
				return this.$.noConflict();
			}
		},
		'log': {
			deps: [],
			exports: 'log'
		},
		'underscore': {
			deps: [

			],
			exports: '_',
			init: function () {
				'use strict';
				return this._.noConflict();
			}
		},
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angularRoute': {
			deps: ['angular'],
			exports: 'angularRoute'
		},
		'angularSanitize': {
			deps: ['angular'],
			exports: 'angularSanitize'
		},
		'angularGrid': {
			deps: ['angular'],
			exports: 'angularGrid'
		},
		'angularGrowl': {
			deps: ['angular'],
			exports: 'angularGrowl'
		},
		'angularBootstrap': {
			deps: ['angular'],
			exports: 'angularBootstrap'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		},
		'moment': {
			exports: 'moment'
		}/*,
		'highcharts': {
			deps: ['jquery'],
			exports: 'Highcharts'
		}*/
	}
});



require(
	[
		'app',
		'log',
		'router'
	],
	function (app, log) {
		'use strict';

		/**
		Initializes the application
		**/
		app.init();
	}
);