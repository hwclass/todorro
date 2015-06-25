'use strict';

/**
 * config constants to export
 *
 * @noparam
 */

var db = require('./db');
var messages = require('./messages');

module.exports = {
	mongo : {
		url : db.mongo.url
	},
	messages : {
		error : {
			default : messages.error.default
		}
	}
}