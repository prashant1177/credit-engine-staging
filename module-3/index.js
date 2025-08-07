const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const creditRoutes = require('./routes/credits');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', creditRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Credit Engine API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
