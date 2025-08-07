module.exports = {
	...require('./mainMiddleware'),
	...require('./express-rate-limit')
};
