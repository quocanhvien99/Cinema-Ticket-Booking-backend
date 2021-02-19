const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
	room: Number,
	movieId: String,
	start: Date,
	seats: {
		type: Array,
		default: [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		],
	},
});

module.exports = mongoose.model('schedule', scheduleSchema);
