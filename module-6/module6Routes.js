const express = require('express');
const path = require('path');
const { calculateCredits } = require('./src/services/creditCalculator');
const { validatePayload } = require('./src/utils/validator');

const router = express.Router();

// Serve static files (optional, if needed in module)
router.use(express.static(path.join(__dirname, 'public')));

// GET: Check credits (no validation needed)
router.get('/check-credits', (req, res) => {
  const baseCredits = 50;
  const spend = 400;
  const multiplier = 0.2;

  const totalCredits = calculateCredits(baseCredits, spend, multiplier);

  res.json({
    baseCredits,
    spend,
    multiplier,
    totalCredits
  });
});

// POST: Award credits (validates input first)
router.post('/award-credits', (req, res) => {
  const validation = validatePayload(req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: "Validation failed", details: validation.errors });
  }

  const { userId, spend = 0 } = req.body;
  const awarded = calculateCredits(50, spend, 0.2);

  res.json({
    message: `Credits awarded to ${userId}`,
    creditsAwarded: awarded
  });
});

// Optional: GET fallback for test
router.get('/award-credits', (req, res) => {
  res.status(405).json({ error: "Use POST method for this route" });
});

module.exports = router;
