/*
 * chat: server/server.js
 * Configuration for the litez server module
 *
 * Copyright (c) 2013 Jon Brule
 * Licensed under the MIT license.
 */

'use strict';

// module dependencies
var Hapi = require('hapi');
var appcfg = require("config").LITEZ;
var program = requireLib('api/program');
var routes = require('./routes');

// configure http server
var hapicfg = {
};
var serverPort = process.env.PORT || appcfg.serverPort;
var server = new Hapi.Server('0.0.0.0', serverPort, hapicfg);
server.addRoutes(routes);
server.addRoutes(program.routes);

// export application configuration
module.exports = server
