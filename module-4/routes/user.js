const express = require('express');
const actionTypes = require('../models/actionTypes');

const router = express.Router();

// In-memory user store (temporary)
const users = new Map();

// Enroll a new user
router.post('/enroll', (req, res) => {
  const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  users.set(userId, { credits: 0 });
  res.status(201).json({ userId, credits: 0 });
});

// Get user credits
router.get('/credits/:userId', (req, res) => {
  const user = users.get(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: req.params.userId, credits: user.credits });
});

// List valid action types
router.get('/action-types', (req, res) => {
  res.json(actionTypes);
});

router.get('/test4', (req, res) => {
  res.json({ message: 'Module 4 is working'});
});
module.exports = router;
