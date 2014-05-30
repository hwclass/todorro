
/*
 * GET home page.
 */

//config setup
var CONFIG = require('./../config');
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

mongoose.connect('mongodb://hwclass:123456@novus.modulusmongo.net:27017/Toxyh2is', function(err) {
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
	    content: "adsfasdasdas",
	    creationDate: "11/01/2014"
    }];

    new Todo({
    	user_id: "2",
    	content: "adsfasdasdas",
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
			err : (err?CONFIG.constants.messages.error.anErrorOccured:'')
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
			res.redirect('/', CONFIG.constants.messages.error.anErrorOccured);
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
			res.redirect( '/', {err : CONFIG.constants.messages.error.anErrorOccured});
		}
	});
};

/*
exports.updatestatus = function (req, res) {
	console.log('1 : ' + mongoose.Types.ObjectId(req.body.id));
	Todo.findById( {_id : mongoose.Types.ObjectId(req.params.id)}, function ( err, todo ){
		console.log('2: ' + todo);
		if (!err) {
			console.log('3: ' + req.params);
			todo.update({done: req.body.done, creationDate:Date.now()}, function () {
				res.redirect('/');
			});
		} else {
			console.log(4);
			console.log(err);
			res.redirect('/', {err : err});
		}
	});
}
*/

exports.status = function (req, res) {
	Todo.findById( {_id : mongoose.Types.ObjectId(req.body.id)}, function ( err, todo ){
		todo.update({done: req.body.done, creationDate:Date.now()}, function () {
			if (!err) {
				res.redirect('/');
			} else {
				res.redirect('/', CONFIG.constants.messages.error.anErrorOccured);
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
			res.redirect( '/', {err : CONFIG.constants.messages.error.anErrorOccured});
		}
	});
};