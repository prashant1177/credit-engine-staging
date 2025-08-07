const express = require('express');
const router = express.Router();

// Sample routes for Module 1
router.get('/test', (req, res) => {
  res.json({ message: 'Module 1 is working!' });
});

router.get('/hello', (req, res) => {
  res.send('Hello from Module 1!');
});

module.exports = router;
