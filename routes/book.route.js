const router = require('express').Router();
const Schedule = require('../models/Schedule');
const User = require('../models/User');
const Movie = require('../models/Movie');
const authMiddleware = require('./auth.middleware');

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

router.post('/', authMiddleware, async (req, res) => {
	const user = await User.findById(req._id);
	const schedule = await Schedule.findById(req.body.scheduleId);
	const movie = await Movie.findById(schedule.movieId);
	const newSeats = req.body.newSeats;
	let tickets = [...user.tickets];
	let total = 0;

	const end = new Date(Date.parse(schedule.start) + movie.time * 60000);

	for (let y = 0; y < newSeats.length; y++) {
		for (let x = 0; x < newSeats[y].length; x++) {
			if (newSeats[y][x] == 2) {
				tickets.push({
					room: schedule.room,
					position: `${alphabet[y]}${x + 1}`,
					start: schedule.start,
					end,
					movieName: movie.name,
				});
				newSeats[y][x] = 1;
				total += 50000;
			}
		}
	}

	if (user.cash < total)
		return res
			.status(400)
			.json('Số tiền trong tài khoản không đủ để thực hiện giao dịch');

	const updateUser = await User.findByIdAndUpdate(req._id, {
		tickets,
		cash: user.cash - total,
	});
	const updateSeats = await Schedule.findByIdAndUpdate(req.body.scheduleId, {
		seats: newSeats,
	});

	res.status(200).json('Mua vé thành công');
});

module.exports = router;
