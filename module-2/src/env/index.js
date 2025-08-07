const dotEnv = require('dotenv');
dotEnv.config();
/**
 * Application environment configuration.
 *
 * @typedef {Object} Env
 * @property {number} PORT
 * @property {string} MONGO_URI
 * @property {string} APP_SECRET
 * @property {number} SALT_ROUNDS
 * @property {string} REDIS_URL
 * @property {'production'|'development'|'testing'} NODE_ENV
 */
const env = {
	PORT: process.env.PORT || 3000,
	MONGO_URI: process.env.MONGO_URI,
	APP_SECRET: process.env.APP_SECRET,
	SALT_ROUNDS: 10,
	REDIS_URL: process.env.REDIS_URL,
	NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = env;
