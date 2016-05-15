var mongoose = require('mongoose');
var hbs = require('express-handlebars');
var express = require('express');
var router = express.Router();

//Imports
var db = require('../../db');
var passport = require('../../auth.js');

router.get('/', function(req, res) {
	res.render('index');
});

// router.get('/register', function(req, res){
// 	res.render('register');
// });

// router.get('/adduser', function(req, res){
// 	var firstname = req.query.firstname;
// 	var lastname = req.query.lastname;
// 	var email = req.query.email;
// 	var password = req.query.pw;	
// 	var uid = mongoose.Types.ObjectId();

// 	var user = new db.userModel({
// 		_id: uid,
// 		firstname: firstname,
// 		lastname: lastname,
// 		email: email,
// 		password: password,
// 		likes: []
// 	});

// 	user.save(function(err){
// 		if(err){
// 			res.sendStatus(1);
// 			res.end();
// 		}else{
// 			res.render('profile');
// 		}
// 	});

// });

// router.get('/profile', function(req, res){
// 	res.render('profile');
// });

// router.get('/login', function(req, res){
// 	res.render('login');
// });

//TODO PASSPORT JS LOGIN AND PERSISTENT SESSION
// router.post('/login_verify',passport.authenticate('local', {
// 		successRedirect: '/',
// 		failureRedirect: '/login'
// }));


router.get('/search', function(req, res){
	var query = req.query.query;
	var uid = mongoose.Types.ObjectId('571414adba8dd3fc067a886f');	

	if(query){
		db.coffeeModel.find({ $text: {$search : query } })
			  .sort('name')
			  .exec(function(err, data){		
			  			var results = data;	  			  						
			  			db.userModel.find({'_id': uid})
			  							.exec(function(err, data){
				  								if(err){
				  									console.log(err);
				  									res.render('search', { title: 'Coffee Results', coffee: results, numresults: results.length, query: query, uid: uid });
				  								}else{
				  									var likes = data[0]['likes']
				  									for(var x = 0; x < results.length; x++){
					  									for(var y = 0; y < likes.length; y++){			  													  										
					  										if(likes[y].equals(results[x]['_id'])){				  									
					  											results[x]['liked'] = true;
					  											break;
					  										}			  										
					  									}
					  									if(y == likes.length){				  												  									
					  										results[x]['liked'] = false;
					  									}
					  								}			  					
					  								res.render('search', { title: 'Coffee Results', coffee: results, numresults: results.length, query: query, uid: uid });
				  								}			  								
				  							});						
					});	
	}
	else{
		db.coffeeModel.find({}, function(err, data){
			var results = data;	  		
  			db.userModel.find({'_id': uid})
  							.exec(function(err, data){
									if(err){
										console.log(err);
										res.render('search', { title: 'Coffee Results', coffee: results, numresults: results.length, query: query, uid: uid });
									}else{
										var likes = data[0]['likes']
										for(var x = 0; x < results.length; x++){
		  									for(var y = 0; y < likes.length; y++){			  													  										
		  										if(likes[y].equals(results[x]['_id'])){				  									
		  											results[x]['liked'] = true;
		  											break;
		  										}			  										
		  									}
		  									if(y == likes.length){				  												  									
		  										results[x]['liked'] = false;
		  									}
		  								}			  					
		  								res.render('search', { title: 'Coffee Results', coffee: results, numresults: results.length, query: query, uid: uid });
									}			  								
								});						
		});	
	}
});

router.post('/like', function(req, res){
	var uid = mongoose.Types.ObjectId(req.body.uid);
	var cid = mongoose.Types.ObjectId(req.body.cid);

	db.userModel.update({'_id': uid},
						    {$push: {'likes': cid}})
					.exec(function(err, data){
							if(err){
								res.sendStatus(1);
								res.end();
							}else{										
								res.sendStatus(0);
								res.end();
							}
						});
});

router.post('/unlike', function(req, res){
	var uid = mongoose.Types.ObjectId(req.body.uid);
	var cid = mongoose.Types.ObjectId(req.body.cid);

	db.userModel.update({'_id': uid},
						    {$pull: {'likes': cid}})			  
					.exec(function(err, data){	
							if(err){
								res.sendStatus(1);
								res.end();
							}else{									
								res.sendStatus(0);
								res.end();
							}						
						});	
});

module.exports = router;