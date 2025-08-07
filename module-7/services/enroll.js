const { validatePayload } = require('../utils/validator');
const { calculateCredits } = require('./creditCalculator');
const { userCredits } = require('./creditsStore');

function enrollUser(req, res) {
  const payload = req.body;

  if (!validatePayload(payload)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { userId, spend } = payload;
  const credits = calculateCredits(spend);

  if (!userCredits[userId]) {
    userCredits[userId] = 0;
  }
  userCredits[userId] += credits;

  return res.status(200).json({ message: 'User enrolled', credits: userCredits[userId] });
}

module.exports = { enrollUser };
