var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://test:123test@ds263619.mlab.com:63619/todo', { useNewUrlParser: true });

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
	user: String,
	item: String
});


//Create a schema for users
var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

var User = new mongoose.model('User', userSchema);

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

	app.get('/home', function(req, res){
		res.render('home');
	});

	app.get('/login', function(req, res){
		res.render('login');
	});
	

	app.get('/signup', function(req, res){

		res.render('signup');
	});

	app.get('/already-taken', function(req, res){

		res.render('already-taken');

	});

	app.get('/invalid', function(req, res){

		res.render('invalid');
	});

	app.post('/login', urlencodedParser, function(req, res){
		var newLogin = req.body;
		var data = {error: false, username: newLogin.username, password: newLogin.password};
		User.findOne({username: newLogin.username, password: newLogin.password}, function (err, obj){
			if(err)
				throw err;
			if(obj === null){
				data.error = true;
			}
			res.json(data);	
			
		});
		
	});
	

	app.post('/signup', urlencodedParser, function(req, res){
		var userInfo = {error: false, username: req.body.username, password: req.body.password};
		//console.log(userInfo);         //To check the data returned
		User.findOne({username: req.body.username}, function(err, obj){
			if(err) throw err;
			if(obj === null){
				var newUser = User(userInfo).save(function(err, data){
					if(err) throw err;	
				});
			}
			else
				userInfo.error = true;
			
			res.json(userInfo);

		});
	});
	
	


	app.get('/todo/:name', function(req, res){
		//get data from mongodb and pass it to view
		Todo.find({user: req.params.name}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
		
	});


	app.post('/todo/:name', urlencodedParser, function(req, res){
		// get data from the view and add it to mongodb
		var block = {user: req.params.name, item: req.body.item};
		var newTodo = Todo(block).save(function(err, data){
			if(err) throw err;
			console.log(data);
			res.json(data);
		});
		
	});

	app.delete('/todo/:name/:item', function(req, res){
		// delete the requested item from mongodb
		Todo.find({user: req.params.name ,item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
			if(err) throw err;
			res.json(data);

		});
	});

	app.use(function(req, res, next){
	  res.status(404);

	  // respond with html page
	  if (req.accepts('html')) {
	    res.render('404');
	    return;
	  }
	});

};