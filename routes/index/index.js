var hbs = require('express-handlebars');
var express = require('express');
var router = express.Router();

//Imports
var coffee = require('../../coffee');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/search', function(req, res){
	var query = req.query.query;

	if(query){
		coffee.find({ $text: {$search : query } })
			  .sort('name')
			  .exec(function(err, data){
						res.render('search', { title: 'Coffee Results', coffee: data, numresults: data.length, query: query });
					});	
	}
	else{
		coffee.find({}, function(err, data){
			res.render('search', { title: 'Coffee Results', coffee: data, numresults: data.length, query: query });
		});	
	}
});

module.exports = router;