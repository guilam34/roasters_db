var passport = require('passport');
var localstrat = require('passport-local').Strategy;

var db = require('./db');

passport.use('local', new localstrat({
  		passReqToCallback : true
  	},
	function(req, email, pw, done) {
		db.userModel.findOne({'email': email }, function (err, user) {
			//if (err) { return done(err); }
			// if (!user) {
			// 	return done(null, false, { message: 'Incorrect email.' });
			// }
			// if (user['password'] != password) {
			//   return done(null, false, { message: 'Incorrect password.' });
			// }
			return done(null, user);
		});
	}
));

module.exports = passport;