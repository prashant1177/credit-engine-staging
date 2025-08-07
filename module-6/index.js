const express = require('express');
const path = require('path');
const app = express();

// Serve public/ at the root URL
app.use(express.static(path.join(__dirname, '../public')));

// Optional: explicitly serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000, () =>
  console.log('🚀 Server running at http://localhost:3000')
);
