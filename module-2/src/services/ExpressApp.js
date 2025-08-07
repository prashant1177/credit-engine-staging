const { mainRoute } = require('../routes');
const { middleware } = require('../middlewares');

const App = (app) => {
	middleware(app);
	app.get('/', (req, res) => {
		return res
			.status(200)
			.json({ message: 'Welcome to the CREDIT ENGINE API. see more details here https://github.com/ShivShankarKushwaha/credit-engine-js' });
	});
	app.use('/api', mainRoute);

	
};

module.exports = { App };
