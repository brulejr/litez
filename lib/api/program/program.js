/*
 * litez: api/program/program.js
 * Schema for the litez program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// program schema
var ProgramSchema = Schema({
    name: { type: String, required: true, unique: true },
    createdOn: { type: Date, required: true }
})

// define program model
module.exports = mongoose.model('Program', ProgramSchema);