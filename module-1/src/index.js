const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.post('/api/enroll', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  res.status(200).json({ message: `User ${userId} enrolled successfully` });
});

app.get('/api/credits/:userId', (req, res) => {
  const { userId } = req.params;
  res.status(200).json({
    userId,
    credits: 0,
    actions: []
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

