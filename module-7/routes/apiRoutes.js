const express = require('express');
const router = express.Router();
const { enrollUser } = require('../services/enroll');
const { getUserCredits } = require('../services/getCredits');

router.post('/enroll', enrollUser);
router.get('/credits/:userId', getUserCredits);

module.exports = router;