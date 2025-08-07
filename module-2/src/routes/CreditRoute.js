const { Router } = require('express');
const { CreditController } = require('../controllers');
// const { AuthenticateUser } = require('../helpers');

const creditRoute = Router();
// creditRoute.use(AuthenticateUser); // Uncomment this line if you want to enforce authentication for credit routes
creditRoute.get('/:userId', CreditController.getUserCredits);
creditRoute.post('/', CreditController.issueCredit);

module.exports = { creditRoute };
