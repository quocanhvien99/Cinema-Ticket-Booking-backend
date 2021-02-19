const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	title: String,
	content: String,
	poster: String,
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('events', eventSchema);
