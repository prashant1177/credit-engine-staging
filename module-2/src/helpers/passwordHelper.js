const bcrypt = require('bcrypt');
const env = require('../env');

const generateSalt = async () => {
	const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
	return salt;
};

const hashPassword = async (password, salt) => {
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
	const match = await bcrypt.compare(password, hashedPassword);
	return match;
};

module.exports = {
	generateSalt,
	hashPassword,
	comparePassword
};
