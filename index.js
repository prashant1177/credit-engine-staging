const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();
const module1Routes = require('./module-1/module1Routes'); 

const { App } = require('./module-2/src/services');
const module3Routes  = require('./module-3/routes/credits');
const module4Routes = require('./module-4/routes/user');
const module6Routes = require('./module-6/module6Routes');
const module7Routes = require('./module-7/routes/apiRoutes');
const module9Routes = require('./module-9/routes/creditRoutes');
const module10Routes = require('./module-10/Routes/api');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


App(app); // this initializes middleware + routes
app.get('/test-health', (req, res) => {
  res.send('Server is working!');
});

app.use('/module-1', module1Routes);
app.use('/module-3', module3Routes);  
app.use('/module-4', module4Routes);   
app.use('/module-6', module6Routes);   
app.use('/module-7', module7Routes);   
// the github repo is missing
app.use('/module-9', module9Routes);   
app.use('/module-10', module10Routes);   

app.listen(PORT, () => {
  console.log(`🚀 Credit Engine Staging running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});
