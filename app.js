var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var handlebars = require('handlebars');
var hbs = require('express-handlebars');
var debug = require('debug')('handle');
var mongoose = require('mongoose');

//Import modules
var server = require('./server');
var routes = require('./routes/index');
var passport = require('./auth.js');

//Request body support
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({
  extended: true
})); 

server.app.use("/styles", express.static(__dirname + '/styles'));
server.app.use("/js", express.static(__dirname + '/js'));
server.app.use('/', routes);

//Configure templating engine
server.app.set('views', path.join(__dirname, 'views'));
server.app.engine('.hbs', hbs({defaultLayout: 'single', extname: '.hbs'}));
server.app.set('view engine', '.hbs');

//Configure passport ****CHECK IF CORRECT
// server.app.use(express.static('public'));
server.app.use(cookieParser);
server.app.use(bodyParser);
server.app.use(session({ secret: 'a2flbsdgkjb3esfl3gv3tgsldkfnsdf23r', resave: true, saveUninitialized: true }));
server.app.use(passport.initialize());
server.app.use(passport.session());

//Configure Helpers
handlebars.registerHelper('coffeelist', function(context, options){
	var ret = "";

	for(var i = 0, j = context.length; i < j; i++){
		ret = ret + options.fn(context[i]);
	}

	return ret;
});

mongoose.connect('mongodb://master:master@ds015770.mlab.com:15770/brewscovery_coffee');