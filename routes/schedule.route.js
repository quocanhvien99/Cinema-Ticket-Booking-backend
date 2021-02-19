const router = require('express').Router();
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
	const schedule = new Schedule({
		room: req.body.room,
		movieId: req.body.movieId,
		start: req.body.start,
	});

	try {
		const savedSchedule = await schedule.save();
		res.json(savedSchedule);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/:movieId', async (req, res) => {
	const schedule = await Schedule.find({ movieId: req.params.movieId }).sort(
		'start'
	);
	res.json(schedule);
});

router.patch('/', async (req, res) => {
	const shedule = await Schedule.findByIdAndUpdate(req.body.id, {
		seats: req.body.seats,
	});
	res.json(shedule);
});

module.exports = router;
