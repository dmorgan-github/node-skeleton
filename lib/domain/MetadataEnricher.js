'use strict';

var debug = require('debug')('api:domain:MetadataEnricher');
var logger = require('../../logger');

module.exports = function (deps) {

	var server = deps.serverRoot;

	/**
	* Adds metadata to resource such as hypermedia links along the lines of rfc5988 http://tools.ietf.org/html/rfc5988
	*
	* @class MetadataEnricher
	* @constructor
	* @module services
	*/
	function MetadataEnricher() {

	}

	/**
	* Adds a links property to the supplied entity.
	*
	* @method enrich
	* @param {Object} model The entity to enrich
	*/
	function enrich(model) {

		var links = [];
		if (!model) {
			return;
		}

		try {

			var type = model.constructor.name;
			if (model.modelName) {
				type = model.modelName();
			}

		} catch (err) {

			debug(err.message);
			logger.error(err.stack);
		}

		model.links = links;
	}

	/**
	* @private
	* @method constructLinks
	*/
	function constructLinks(model, type) {

		var links = [];
		links.push({
			'rel': 'self',
			'href': server.concat('/api/', type, '/', model.id)
		});

		return links;
	}

	MetadataEnricher.prototype = {
		enrich: enrich
	};

	return MetadataEnricher;
};