const router = require('express').Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
	var { page, limit } = req.query;
	limit = parseInt(limit);
	page = parseInt(page);
	const skip = (page - 1) * limit;

	const events = await Event.find({}).sort('-date').skip(skip).limit(limit);
	const count = await Event.countDocuments({});

	const data = {
		events,
		pages: Math.ceil(count / limit),
	};

	res.json(data);
});

router.get('/:id', async (req, res) => {
	let id = req.params.id;
	id = id.slice(0, id.length - 1);
	const data = await Event.findById(id);
	res.json(data);
});

router.post('/', async (req, res) => {
	const event = new Event({
		title: req.body.title,
		content: req.body.content,
		poster: req.body.poster,
	});

	try {
		const savedEvent = await event.save();
		res.json(savedEvent);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
