
// Grunt.
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Lint task.
		// Enforces JavaScript coding standards.
		jshint: {

			options: {
	            jshintrc: './.jshintrc'
	        },

			all: [
				'./app.js',
				'./controllers/**/*.js',
				'./lib/**/*.js',
				'./runtime/**/*.js',
				'./public/js/src/**/*.js'
			]
		},

		// Uglify task.
		// Optimize & compress JavaScript library files.
		uglify: {
			options: {
				compress: true,
				mangle: false,
				preserveComments: false,
				preserveLicenseComments: true
			},
			lib: {
				files: {
					'js/min/require.min.js': ['js/lib/require/require.js']
				}
			}
		},

		// Require task.
		// Optimize & compress JavaScript source files.
		requirejs: {
			compile: {
				options: {
					baseUrl: './public/js/src',
					mainConfigFile: './public/js/src/main.js',
					out: './public/js/min/main.min.js',
					name: 'main',
					optimize: 'uglify',
					uglify: {
						preserveComments: false,
						preserveLicenseComments: true
					}
				}
			}
		},

        dustjs: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/',
                        src: '**/*.dust',
                        dest: '.build/templates',
                        ext: '.js'
                    }
                ],
                options: {
                    fullname: function (filepath) {
                        var path = require('path'),
                            name = path.basename(filepath, '.dust'),
                            parts = filepath.split(path.sep),
                            fullname = parts.slice(3, -1).concat(name);

                        return fullname.join(path.sep);
                    }
                }
            }
        },

        // Less task.
		// Compiles less files into css.
		less: {
			'default': {
				files: {
					'public/css/app.css': 'public/less/app.less'
				},
				options: {
					compress: true
				}
			}
		},

		// Documentation.
		yuidoc: {
			'default': {
				name: '<%= pkg.name %>',
				options: {
					paths: [
      					'./'
				    ],
				    exclude: 'public,config,test,views,node_modules',
					outdir: './docs/<%= pkg.name %>'
				}
			}
		},

		copy: {
	      build: {
	        cwd: '.',
	        src: [
	        	'app.js',
	        	'logger.js',
	        	'package.json',
	        	'config/**',
	        	'lib/**',
	        	'runtime/**',
	        	'node_modules/**',
	        	'controllers/**',
	        	'public/css/**',
	        	'public/js/min/**',
	        	'public/components/**',
	        	'public/templates/**',
	        	'public/fonts/**',
	        	'public/images/**',
	        	'views/**'
	        ],
	        dest: '../build/<%= pkg.name %>',
	        expand: true
	      },
	    },

	    clean: {
		  build: {
		  	options: {
		  		force: true
		  	},
		    src: [
		    	'./build/<%= pkg.name %>',
		    	'./publish/<%= pkg.name %>.zip'
		    ]
		  },
		  package: {
		  	options: {
		  		force: true
		  	},
		  	src: [
		  		'./build/<%= pkg.name %>/node_modules/grunt*'
		  	]
		  }
		},

		compress: {
		  main: {
		    options: {
		      archive: './publish/<%= pkg.name %>.zip'
		    },
		    expand: true,
		    cwd: './build/<%= pkg.name %>',
		    src: ['**']
		  }
		},

		mochaTest: {
	      test: {
	        options: {
	          reporter: 'spec'
	        },
	        src: ['test/unit/*.js']
	      }
	    },

	    bump: {
		  options: {
		    files: ['package.json'],
		    commit: true,
		    commitMessage: 'Release API v%VERSION%',
		    commitFiles: ['package.json'], // '-a' for all files
		    createTag: true,
		    tagName: 'api-v%VERSION%',
		    tagMessage: 'API Version %VERSION%',
		    push: true,
		    pushTo: 'origin'/*,
		    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'*/ // options to use with '$ git describe'
		  }
		},

	    watch: {
            files: "./public/less/**",
            tasks: ["less:default"]
        }

	});

	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-dustjs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bump');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'mochaTest']);
	grunt.registerTask('build', ['jshint', 'mochaTest', 'clean:build', 'requirejs', 'less']);
	grunt.registerTask('package', ['jshint', 'mochaTest', 'bump:build', 'clean:build', 'requirejs', 'less', 'copy', 'clean:package','compress']);
	//grunt.registerTask('package2', ['jshint', 'mochaTest', 'clean:build', 'requirejs', 'less', 'copy', 'clean:package','compress']);
};