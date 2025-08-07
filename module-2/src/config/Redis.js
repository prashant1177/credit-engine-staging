const { createClient } = require('redis');
const env = require('../env');

let client;

const initRedisClient = async () => {
	if (!client) {
		client = createClient({
			url: env.REDIS_URL,
			socket: {
				reconnectStrategy: (retryCount) => {
					if (retryCount > 3) {
						return false;
					}
					const delay = Math.min(retryCount * 500, 2000);
					return delay;
				}
			}
		});
		client.on('error', (err) => {
			console.log('Error creating redis client' + err);
		});
	}
	try {
		await client.connect();
		console.log('Redis client connected');
	} catch (error) {
		console.log('Error on redis initialization ' + error);
		throw new Error('Error on redis initialization');
	}
	return client;
};

const getRedisValue = async (key) => {
	try {
		const value = await client.json.get(`user:${key}`);
		return value;
	} catch (error) {
		console.log('Error on get redis value ' + error);
		return null;
	}
};

const setRedisValue = async (key, value, ttl = 300) => {
	try {
		const redisKey = `user:${key}`;
		await client.json.set(redisKey, '$', value);
		await client.expire(redisKey, ttl);
	} catch (error) {
		console.error('Error on set redis value:', error);
		return null;
	}
};

module.exports = {
	initRedisClient,
	getRedisValue,
	setRedisValue
};
