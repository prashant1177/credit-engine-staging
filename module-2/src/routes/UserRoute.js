const { Router } = require('express');
const { UserController } = require('../controllers');
const { AuthenticateUser } = require('../helpers');
const { loginLimiter } = require('../middlewares');

const UserRoute = Router();
UserRoute.post('/signup', UserController.signup);
UserRoute.post('/login', loginLimiter, UserController.login);

UserRoute.use(AuthenticateUser);
UserRoute.get('/profile', UserController.profile);

module.exports = { UserRoute };
