const express = require('express');
const router = express.Router();

// @desc    Get all organization line
// @route   GET /api/v1/lines
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all lines' });
});

// @desc    Get single organization line
// @route   GET /api/v1/lines/:id
// @access  Public
router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show single line ${req.params.id}` });
});

// @desc    Create organization line
// @route   POST /api/v1/lines/
// @access  Private
router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create organization line' });
});

// @desc    Update organization line
// @route   PUT /api/v1/lines/:id
// @access  Private
router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update organization line ${req.params.id}` });
});

// @desc    Update organization line
// @route   DELETE /api/v1/lines/:id
// @access  Private
router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Delete organization line' });
});

module.exports = router;
