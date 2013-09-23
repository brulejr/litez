/*
 * litez: api/program/index.js
 * Entry point for the litez program api
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Types = require('hapi').types;
var service = require('./service');

var addProgramHandler = function (req) {
  service.addProgram(req.payload, 
    function(program) {
      req.reply(program).code(201).header('Location: /api/program/' + program.id);  
    },
    function(err) {
      switch (err.type) {
        case "CONFLICT":
          req.reply(err).code(409);
          break;
        default:
          req.reply(err).code(500);
      }
    }
  );
};

var deleteProgramHandler = function (req) {
  service.deleteProgram(req.params.id, 
    function(program) {
      req.reply(program);
    },
    function(err) {
      switch (err.type) {
        default:
          req.reply(err).code(500);
      }
    }
  );
};

var getProgramHandler = function (req) {
  service.getProgram(req.params.id, 
    function(program) {
      req.reply(program);
    },
    function(err) {
      switch (err.type) {
        case "NOT_FOUND":
          req.reply(err).code(404);
          break;
        default:
          req.reply(err).code(500);
      }
    },
    function(err) {
      switch (err.type) {
        default:
          req.reply(err).code(500);
      }
    }
  );
};

var getProgramsHandler = function (req) {
  service.getPrograms({}, function(programs) {
    req.reply(programs);
  })
};

// server startup
exports.routes = [
  { method: 'GET', path: '/api/program', config: { 
  	  handler: getProgramsHandler,
  	  validate: { query: { name: Types.String() } } 
  }},
  { method: 'GET', path: '/api/program/{id}', config: { 
  	  handler: getProgramHandler
  }},
  { method: 'POST', path: '/api/program', config: { 
  	  handler: addProgramHandler, 
  	  payload: 'parse', 
  	  validate: { payload: { name: Types.String().required().min(3) } } 
  }},
  { method: 'DELETE', path: '/api/program/{id}', config: { 
      handler: deleteProgramHandler
  }}
];
