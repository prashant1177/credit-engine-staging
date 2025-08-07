// File: api/index.js
const express = require('express');
const apiRoutes = require('../src/routes/apiRoutes');
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send('Credit Engine API is live!'));
app.use('/api', apiRoutes);

module.exports = app;
