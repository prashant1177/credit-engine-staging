const { Router } = require('express');
const { UserRoute } = require('./UserRoute');
const { creditRoute } = require('./CreditRoute');
const { UserController } = require('../controllers');

const mainRoute = Router();

mainRoute.use('/user', UserRoute);
mainRoute.use('/credits', creditRoute);
mainRoute.post('/enroll',UserController.signup);

module.exports = { mainRoute };
