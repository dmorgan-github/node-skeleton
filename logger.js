'use strict';

var winston = require('winston');

var customLevels = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  colors: {
    debug: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
}

var logger = new (winston.Logger)({

	level: 'error',
  	levels: customLevels.levels,
  	handleExceptions: true,

	transports: [
		new (winston.transports.Console)({
			level: 'error',
			levels: customLevels.levels,
			handleExceptions: true,
			colorize: true,
			timestamp: true
	    })
    ]
  });

module.exports = logger;