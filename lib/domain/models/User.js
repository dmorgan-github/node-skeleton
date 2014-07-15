'use strict';

var status = require('../enums').DataStatus;

/**
* Represents a user of the system
*
* @class User
* @constructor
* @module models
*/
function User(data) {

	data = data || {};

	/**
	* Gets or sets the unique user id
	*
	* @property id
	* @type String
	*/
	this.id = (data._id || data.id) || null;

	/**
	* Gets or sets the user first name
	*
	* @property firstName
	* @type String
	*/
	this.firstName = data.firstName || null;

	/**
	* Gets or sets the user user last name
	*
	* @property lastName
	* @type String
	*/
	this.lastName = data.lastName || null;

	/**
	* Gets or sets the user login
	*
	* @property username
	* @type String
	*/
	this.username = data.username || null;

	/**
	* Gets or sets the apikey for the account
	*
	* @property apikey
	* @type String
	*/
	this.apikey = data.apikey || null;

	/**
	* Gets or sets the {{#crossLink "DataStatus"}}{{/crossLink}} of the resource.
	*
	* @property status
	* @type String
	*/
	this.status = data.status || status.active;

	/**
	* Gets or sets the date the resource was last modified
	*
	* @property lastModified
	* @type Date
	*/
	this.lastModified = data.lastModified || null;

	/**
	* Gets or sets the date the resource was created
	*
	* @property dateCreated
	* @type Date
	*/
	this.dateCreated = data.dateCreated || null;

	/**
	* Gets or sets the username of the {{#crossLink "User"}}{{/crossLink}} 
	* that created the entity
	*
	* @property createdBy
	* @type String
	*/
	this.createdBy = data.createdBy || null;

	/**
	* Gets or sets the username of the {{#crossLink "User"}}{{/crossLink}} 
	* that last modified the resource
	*
	* @property modifiedBy
	* @type String
	*/
	this.modifiedBy = data.modifiedBy || null;
}

/**
* @method validate
*/
User.prototype.validate = function () {

	if (!this.username || this.username.length === 0) {
		throw new Error('Username is required.');
	}
};

module.exports = User;