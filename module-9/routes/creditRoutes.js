const express = require('express');
const router = express.Router();

const credits = {}; // This should ideally be stored in a database

// API: Enroll user
router.post('/enroll', (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  credits[userId] = { thankYouCredits: 0 };
  res.status(200).json({ message: 'User enrolled', userId });
});

// API: Get user credits
router.get('/credits/:userId', (req, res) => {
  const { userId } = req.params;
  const credit = credits[userId];

  if (!credit) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(credit);
});

module.exports = router;
