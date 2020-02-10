const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // logger console

// Load ENV
dotenv.config({ path: './config/config.env' });

const app = express();

// Middlware
if (process.env.NODE_ENV === 'development') {
  // logger to console
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mon on port ${PORT}`)
);
