/*
 * litez: api/program/service.js
 * Service backing the litez program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var mongoose = require ('mongoose');
var Program = require('./program');

// connect to mongodb database
mongoose.connect('mongodb://localhost/litez');

// program apis
exports.addProgram = function (program, success, failure) {
	var program = new Program({
		name: program.name, 
		createdOn: new Date
	}).save(function (err, result) {
    if (err) {
    	switch (err.code) {
    		case 11000:
    		  failure({
    		  	type: "CONFLICT",
    		  	error: err.err,
    		  	program: program
    		  });
    		  break;
    		default:
    		  failure({
    		  	type: "INTERNAL_ERROR",
    		  	error: err.err,
    		  	program: program
    		  });
    	}
    } else {
    	success(result);
    }
  });
};

exports.deleteProgram = function (id, success, failure) {
  Program.remove({'_id': id}, function(err, result) {
    if (err) {
    	failure(err);
    } else {
    	success(result);
    }
  });	
};

exports.getProgram = function (id, success, failure) {
  Program.findOne({'_id': id}, function(err, result) {
    if (err) {
    	failure(err);
    } else {
    	if (result) {
        success(result);
    	} else {
  		  failure({
  		  	type: "NOT_FOUND",
  		  	id: id
   		  });
    	}
    }
  });	
};

exports.getPrograms = function (query, success, failure) {
	Program.find(function(err, result) {
		if (err) {
			failure(err);
		} else {
			success(result);
		}
  });
};
