var express = require('express');
var path = require('path');
var handlebars = require('handlebars');
var hbs = require('express-handlebars');
var debug = require('debug')('handle');

//Import modules
var server = require('./server');
var routes = require('./routes/index');

server.app.use("/styles", express.static(__dirname + '/styles'))
server.app.use('/', routes);

//Configure templating engine
server.app.set('views', path.join(__dirname, 'views'));
server.app.engine('.hbs', hbs({defaultLayout: 'single', extname: '.hbs'}));
server.app.set('view engine', '.hbs');

//Configure Helpers
handlebars.registerHelper('coffeelist', function(context, options){
	var ret = "";

	for(var i = 0, j = context.length; i < j; i++){
		ret = ret + options.fn(context[i]);
	}

	return ret;
});