const { userCredits } = require('./creditsStore');

function getUserCredits(req, res) {
  const { userId } = req.params;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  const credits = userCredits[userId] || 0;
  return res.status(200).json({ userId, credits });
}

module.exports = { getUserCredits };
