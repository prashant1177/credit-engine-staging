// credit-service/index.js (MODIFIED)
const express = require('express');
const { App } = require('./services');
const { dbConnect } = require('./config');

// This will be your router for the microservice
const router = express.Router();

// Attach all routes using the App() setup
App(router);

// Ensure DB is connected
dbConnect().then(() => {
  console.log('Credit Service DB connected');
}).catch((err) => {
  console.error('Credit Service DB connection failed:', err);
});

module.exports = router;
