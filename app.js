
/**
 * Module dependencies.
 */

 // mongoose setup
var DB = require( './db' );

//config setup
var CONFIG = require( './config' );

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var engine  = require('ejs-locals');
/*var winston = require('winston'); - activate if you want logging.*/

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
