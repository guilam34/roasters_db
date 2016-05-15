//Configure Mongo Client
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var coffeeSchema = new Schema({
	_id: mongoose.Schema.ObjectId,
	roaster: String,
	name: String,
	desc: String,
	link: String }, 
	{ collection : 'Coffee'});

var userSchema = new Schema({
	_id: mongoose.Schema.ObjectId,
	email: String,
	firstname: String,
	lastname: String,
	password: String,
	likes: Array },
	{ collection: 'Users'});

module.exports = {
	coffeeModel: mongoose.model('Coffee', coffeeSchema),
	userModel: mongoose.model('User', userSchema)
}

