// Do NOT use app.set in middleware when using router
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('../config');
const { limiter } = require('./express-rate-limit');

const middleware = (router) => {
	router.use(express.json({ limit: '10mb' }));
	router.use(cors());
	router.use(logger);
	router.use(cookieParser());
	router.use(limiter);
};

module.exports = { middleware };
