const express = require('express');
const api = require("./Routes/api.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);
app.get('/', (req, res) => {
    res.send('Working');
});

module.exports = app;
