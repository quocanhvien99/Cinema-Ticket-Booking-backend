const router = require('express').Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
	var { page, limit, type } = req.query; //type now or soon
	limit = parseInt(limit);
	page = parseInt(page);
	const skip = (page - 1) * limit;

	const query = {
		releaseDate: { [type == 'now' ? '$lte' : '$gt']: Date.now() },
	};

	const movies = await Movie.find(query)
		.sort(type == 'now' ? '-releaseDate' : 'releaseDate')
		.skip(skip)
		.limit(limit)
		.select('name score poster trailer time genre releaseDate');
	const count = await Movie.countDocuments(query);

	const data = {
		movies: movies,
		pages: Math.ceil(count / limit),
	};

	res.json(data);
});

router.get('/:id', async (req, res) => {
	let id = req.params.id;
	id = id.slice(0, id.length - 1);
	const data = await Movie.findById(id);
	res.json(data);
});

router.post('/', async (req, res) => {
	const movie = new Movie({
		name: req.body.name,
		language: req.body.language,
		genre: req.body.genre,
		actor: req.body.actor,
		time: req.body.time,
		releaseDate: req.body.releaseDate,
		score: req.body.score,
		summery: req.body.summery,
		trailer: req.body.trailer,
		poster: req.body.poster,
	});

	try {
		const savedMovie = await movie.save();
		res.json(savedMovie);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
