const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // logger console
const colors = require('colors');
const connectDB = require('./config/db');

// Load Middleware
const errorHandler = require('./middlewares/error');

// Load ENV
dotenv.config({ path: './config/config.env' });

// ConnectDB
connectDB();

// import routes files
const lines = require('./routes/lines');
const results = require('./routes/results');

const app = express();

// Body Parser สำหรับรับข้อมูลจาก client ที่เป็นก้อน รวมเป็นก้อนเดียว
app.use(express.json());

// Middlware
if (process.env.NODE_ENV === 'development') {
  // logger to console
  app.use(morgan('dev'));
}

// Moute Routes
app.use('/api/v1/lines', lines);
app.use('/api/v1/results', results);

// Moute Error Handler
app.use(errorHandler);

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
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});
