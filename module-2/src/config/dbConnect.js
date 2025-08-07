const mongoose = require('mongoose');
const env = require('../env/index');

const dbConnect = async () => {
	mongoose
		.connect(env.MONGO_URI)
		.then(() => console.log('MongoDB connected'))
		.catch((err) => console.log('database not connected', err));
};

module.exports = { dbConnect };
