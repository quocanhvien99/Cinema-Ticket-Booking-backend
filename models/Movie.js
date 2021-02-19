const mongoose = require('mongoose');

movieSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	language: {
		type: String,
		require: true,
	},
	genre: [{ type: String }],
	actor: [{ type: String }],
	time: {
		type: Number,
		require: true,
	},
	releaseDate: {
		type: Date,
		require: true,
	},
	score: {
		tomatometer: Number,
		audience: Number,
	},
	summery: {
		type: String,
		require: true,
	},
	trailer: {
		type: String,
		default: 'https://youtu.be/psZ1g9fMfeo',
	},
	poster: {
		type: String,
		require: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('movies', movieSchema);
