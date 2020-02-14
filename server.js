const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // logger console
const colors = require('colors');

// Load ENV
dotenv.config({ path: './config/config.env' });

const app = express();

// Middlware
if (process.env.NODE_ENV === 'development') {
  // logger to console
  app.use(morgan('dev'));
}

// Routes
// @desc    Get all organization line
// @route   GET /api/v1/lines
// @access  Public
app.get('/api/v1/lines', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all lines' });
});

// @desc    Get single organization line
// @route   GET /api/v1/lines/:id
// @access  Public
app.get('/api/v1/lines/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show single line' });
});

// @desc    Create organization line
// @route   POST /api/v1/lines/
// @access  Private
app.post('/api/v1/lines/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create organization line' });
});

// @desc    Update organization line
// @route   PUT /api/v1/lines/:id
// @access  Private
app.put('/api/v1/lines/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Update organization line' });
});

// @desc    Update organization line
// @route   DELETE /api/v1/lines/:id
// @access  Private
app.delete('/api/v1/lines/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Delete organization line' });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
