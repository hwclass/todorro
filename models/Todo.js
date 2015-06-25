'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * Todo model to export
 *
 * {Schema} Todo
 */ 
module.exports = new Schema({
  user_id : String,
  content : String,
  creationDate : { type: Date, default: Date.now },
  done : false
});