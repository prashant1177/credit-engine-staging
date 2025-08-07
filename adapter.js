// Example: module-1/adapter.js
const express = require('express');
const router = express.Router();

// Import the original module's routes
try {
  const originalApp = require('./app.js') || require('./index.js') || require('./server.js');
  
  // If it's an Express app, mount it
  if (originalApp && typeof originalApp.use === 'function') {
    router.use('/', originalApp);
  } else {
    // Manual route mounting - adapt based on each module's structure
    router.get('/', (req, res) => {
      res.json({ module: 'module-1', status: 'active' });
    });
  }
} catch (error) {
  console.error('Module adapter error:', error);
  router.get('/', (req, res) => {
    res.status(500).json({ error: 'Module failed to load', module: 'module-1' });
  });
}

module.exports = router;