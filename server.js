const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // logger console
const colors = require('colors');
const connectDB = require('./config/db');

// Load ENV
dotenv.config({ path: './config/config.env' });

// ConnectDB
connectDB();

// import routes files
const lines = require('./routes/lines');

const app = express();

// Middlware
if (process.env.NODE_ENV === 'development') {
  // logger to console
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/lines', lines);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

// Global Handler unhandled promises rejections กรณี DB crash
process.on('unhandledRejection', (err, promise) => {
  // แสดงผลใน console กรณี error
  console.log(`Error: ${err.message}`);

  // Close server & exit process
  server.close(() => process.exit(1));
});
