const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./auth.middleware');

router.post('/register', async (req, res) => {
	//Check exist
	const isExist = await User.findOne({ email: req.body.email });
	if (isExist) return res.status(400).json('Tài khoản đã tồn tại.');
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(req.body.password, salt);
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});
	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/login', async (req, res) => {
	//Check exist
	const isExist = await User.findOne({ email: req.body.email });
	if (!isExist) return res.status(400).json('Tài khoản không tồn tại.');

	const checkPassword = bcrypt.compareSync(req.body.password, isExist.password);
	if (!checkPassword) return res.status(400).json('Sai mật khẩu.');

	const authToken = jwt.sign({ _id: isExist._id }, process.env.JWT_Secret, {
		expiresIn: '1h',
	});

	res.json(authToken);
});

router.post('/social', async (req, res) => {
	//Check exist
	let type; //google or facebook
	if (req.body.type == 'google') type = 'ggId';
	else type = 'fbId';

	let isExist = await User.findOne({ [type]: req.body.id });
	if (!isExist) {
		isExist = await User.findOneAndUpdate(
			{ email: req.body.email },
			{ [type]: req.body.id }
		);
		if (!isExist) {
			const user = new User({
				email: req.body.email,
				[type]: req.body.id,
				name: req.body.name,
			});
			isExist = await user.save();
		}
	}

	const authToken = jwt.sign({ _id: isExist._id }, process.env.JWT_Secret, {
		expiresIn: '1h',
	});

	res.json(authToken);
});

router.post('/', authMiddleware, async (req, res) => {
	const user = await User.findOne({ _id: req._id });
	res.json({
		name: user.name,
		cash: user.cash,
		tickets: user.tickets,
	});
});

module.exports = router;
