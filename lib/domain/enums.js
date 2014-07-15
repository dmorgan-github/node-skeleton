'use strict';

/**
* Constants used for the status of persisted documents
* @class DataStatus
* @module models
*/
module.exports.DataStatus = Object.freeze({

	/**
	* @property pending
	* @type String
	* @final
	* @default pending
	*/
	pending: 'pending',

	/**
	* @property deleted
	* @type String
	* @final
	* @default deleted
	*/
	deleted: 'deleted',

	/**
	* @property active
	* @type String
	* @final
	* @default active
	*/
	active: 'active',

	/**
	* @property disabled
	* @type String
	* @final
	* @default disabled
	*/
	disabled: 'disabled'
});