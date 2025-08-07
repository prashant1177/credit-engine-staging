const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h2> Credit Engine API is Live!</h2>
    <p>Use the following endpoints:</p>
    <ul>
      <li><strong>POST</strong> /api/enroll - Enroll a user and assign credits</li>
      <li><strong>GET</strong> /api/credits/:userId - Get user credits</li>
    </ul>
    <p>Test using <a href="https://www.postman.com/">Postman</a> or any REST client.</p>
  `);
});


app.get('/api/enroll', (req, res) => {
  res.send('This endpoint only supports POST requests to enroll users.');
});

app.get('/api/credits/:userId', (req, res) => {
  res.send('This endpoint requires a valid userId in the URL to fetch credits.');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
