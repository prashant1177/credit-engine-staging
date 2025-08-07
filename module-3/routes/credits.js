const express = require('express');
const ACTION_TYPES = require('../models/actionTypes');
const router = express.Router();

// In-memory store (for demonstration)
const users = {};

/**
 * Enroll a new user
 * POST /api/enroll
 * Body: { userId: "naveen123" }
 */

router.get('/test3', (req, res) => {
  res.json({ message: 'Module 3 is working!' });
});

router.post('/enroll', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  if (users[userId]) {
    return res.status(400).json({ error: 'User already enrolled' });
  }

  users[userId] = { credits: [], total: 0 };
  return res.status(201).json({ message: `User ${userId} enrolled` });
});

/**
 * Add credit to a user
 * POST /api/credits
 * Body: { userId: "naveen123", actionType: "techModule" }
 */
router.post('/credits', (req, res) => {
  const { userId, actionType } = req.body;

  if (!userId || !actionType) {
    return res.status(400).json({ error: 'userId and actionType are required' });
  }

  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!Object.values(ACTION_TYPES).includes(actionType)) {
    return res.status(400).json({ error: 'Invalid action type' });
  }

  const creditValue = 10; // Static credit value
  users[userId].credits.push({ actionType, credit: creditValue });
  users[userId].total += creditValue;

  return res.status(200).json({
    message: `Credited +${creditValue} points to ${userId}`,
    total: users[userId].total
  });
});

/**
 * Get credit info for a user
 * GET /api/credits/:userId
 */
router.get('/credits/:userId', (req, res) => {
  const { userId } = req.params;

  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json(users[userId]);
});

module.exports = router;
