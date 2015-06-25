'use strict';

 /*!
 * Todorro - A simple todo app with Node + Express + EJS
 *
 * Copyright (c) 2015 Barış Güler
 * http://hwclass.in
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * Launch  : May 2014
 * Version : 1.1.0
 * Released: May 30th, 2014
 *
 *
 * tracks the issues
 */

//import config
var config = require( './config' );

//define express
var express = require('express');

//define express routing
var routes = require('./routes');

//define default http server
var http = require('http');

//define path plugin
var path = require('path');

//define ejs templating
var engine  = require('ejs-locals');

//define winston to log
var winston = require('winston');

//create app from the instance called express
var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use( express.cookieParser());
//app.use( express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/*remove expressjs information from browser*/
app.disable('x-powered-by');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*index page router*/
app.get('/', routes.index);

/*router for a page of adding a todo item*/
app.post('/add', routes.add);

/*router for a page of updating a todo item*/
app.post('/update', routes.update);

/*router for a page of updatconnect.limit() will be removed in connect 3.0connect.limit() will be removed in connect 3.0ing a todo's done status*/
app.post('/status', routes.status);

/*router for a page of deleting a todo*/
app.get('/remove/:id', routes.remove);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

