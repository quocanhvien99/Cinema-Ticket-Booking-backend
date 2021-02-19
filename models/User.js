const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		min: 8,
	},
	password: {
		type: String,
		min: 8,
	},
	fbId: String,
	ggId: String,
	cash: {
		type: Number,
		default: 10000000,
	},
	tickets: [
		{
			room: Number,
			position: String,
			start: Date,
			end: Date,
			movieName: String,
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('users', userSchema);
