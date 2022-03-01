const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')
require('dotenv').config();


// app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000, type: '*/x-www-form-urlencoded' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes)
app.use('/', (req, res) => {
  return res.json({
    message: 'Route not found',
    context: 'Route does not exists'
  }).status(404);
});


module.exports = app;