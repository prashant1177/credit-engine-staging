require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const actionTypes = require('./models/actionTypes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage
const users = new Map();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Credit Engine API is Live');
});

// Enrollment endpoint
app.post('/api/enroll', (req, res) => {
  const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  users.set(userId, { credits: 0 });
  res.status(201).json({ userId, credits: 0 });
});

// Credits endpoint
app.get('/api/credits/:userId', (req, res) => {
  const user = users.get(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ userId: req.params.userId, credits: user.credits });
});

// Action types endpoint
app.get('/api/action-types', (req, res) => {
  res.json(actionTypes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Valid action types:', Object.values(actionTypes));
});
