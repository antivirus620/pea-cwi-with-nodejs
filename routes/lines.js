const express = require('express');
const router = express.Router();

// Import from controllers
const {
  getLines,
  getLine,
  createLine,
  updateLine,
  deleteLine
} = require('../controllers/lines');

router
  .route('/')
  .get(getLines)
  .post(createLine);

router
  .route('/:id')
  .get(getLine)
  .put(updateLine)
  .delete(deleteLine);

module.exports = router;
