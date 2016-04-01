//Configure Mongo Client
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/coffeeroasters');

var Schema = mongoose.Schema;

var coffeeSchema = new Schema({
	roaster: String,
	name: String,
	desc: String,
	link: String }, 
	{ collection : 'Coffee'});

var coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = coffee;