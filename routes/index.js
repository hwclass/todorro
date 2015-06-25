
/*
 * GET home page.
 */

/*Todo model to import*/
var Todo = require('./models/Todo');

//config setup
var config = require('./../config');

var winston = require('winston');
winston.add(winston.transports.File, {filename: 'date.log'});

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
  user_id : String,
  content : String,
  creationDate : { type: Date, default: Date.now },
  done : false      
});

mongoose.model( 'Todo', Todo );

mongoose.connect(config.mongo.url, function(err) {
	if (err) console.log(err);
});

var Todo = mongoose.model( 'Todo' );

var dbConnection = mongoose.connection;

dbConnection.once('open', function callback () {
	console.log('DB connection opened...');
	//populateDBWithTodos();
});

/*populating DB with dummy datas*/
populateDBWithTodos = function () {
    var newTodo = [{
	    user_id: "2",
	    content: "New Todo 1",
	    creationDate: "11/01/2014"
    }];
    new Todo({
    	user_id: "2",
    	content: "New Todo 2",
    	creationDate: "11/01/2014"
    }).save(function (err, todo, count) {
    	console.log(todo, count);
    });
}

/*get index page with all todo items*/
exports.index = function (req, res){
	console.log('index route 1');
	Todo.find({}, function ( err, todos, count ){
		res.render( 'index', {
			title : 'Express Todo Example',
			todos : todos,
			err : (err?config.messages.error.default:'')
		});
	}).sort( '-creationDate' );
};

/*add todo item*/
exports.add = function (req, res){
	new Todo({
		user_id : req.cookies.user_id,
		content    : req.body.content,
		creationDate : Date.now(),
		done : false
	}).save(function(err, todo, count){
		if (!err) {
			winston.log('data', 'New todo saved.');
			res.redirect('/');
		} else {
			res.redirect('/', config.messages.error.default);
		}
	});
};

/*update todo item*/
exports.update = function ( req, res ){
	Todo.findById( {_id : mongoose.Types.ObjectId(req.body.id)}, function ( err, todo ){
		if (!err) {
			todo.update({content:req.body.content, creationDate:Date.now()}, function () {
				res.redirect('/');
			});
		} else {
			res.redirect( '/', {err : config.messages.error.default});
		}
	});
};

exports.status = function (req, res) {
	Todo.findById( {_id : mongoose.Types.ObjectId(req.body.id)}, function ( err, todo ){
		todo.update({done: req.body.done, creationDate:Date.now()}, function () {
			if (!err) {
				res.redirect('/');
			} else {
				res.redirect('/', config.messages.error.default);
			}
		});
	});
}

/*remove todo item*/
exports.remove = function ( req, res ){
	Todo.findById( req.params.id, function ( err, todo ){
		if (!err) {
			todo.remove( function ( err, todo ){
			  res.redirect( '/' );
			});
		} else {
			res.redirect( '/', {err : config.messages.error.default});
		}
	});
};