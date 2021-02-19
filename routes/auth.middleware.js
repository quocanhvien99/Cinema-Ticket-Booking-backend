const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const decode = jwt.verify(req.body.authToken, process.env.JWT_Secret);
		req._id = decode._id;
		next();
	} catch (err) {
		res.status(400).json('Invalid token');
	}
};
