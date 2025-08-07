const Jwt = require('jsonwebtoken');
const env = require('../env');
const { User } = require('../models');

const generateToken = (payload) => {
	console.log('payload', payload);
	const token = Jwt.sign(payload, env.APP_SECRET);
	return token;
};

const verifyToken = (token) => {
	const payload = Jwt.verify(token, env.APP_SECRET);
	return payload;
};

const AuthenticateUser = async (req, res, next) => {
	const token = req.cookies['token'];
	if (token) {
		const payload = verifyToken(token);
		if (payload) {
			const user = await User.findById(payload);
			if (user) {
				req.user = { _id: user.id, name: user.name, email: user.email };
				next();
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		} else {
			req.user = null;
			res.status(401).json({ message: 'Unauthorized access' });
		}
	} else {
		res.status(401).json({ message: 'Unauthorized access, Please Login to access this route' });
	}
};

module.exports = {
	generateToken,
	verifyToken,
	AuthenticateUser
};
