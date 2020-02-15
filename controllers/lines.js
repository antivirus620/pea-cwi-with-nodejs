// import models
const Line = require('../models/Line');

// @desc    Get all organization line
// @route   GET /api/v1/lines
// @access  Public
// * export function
exports.getLines = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all lines' });
};

// @desc    Get single organization line
// @route   GET /api/v1/lines/:id
// @access  Public
exports.getLine = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show single line ${req.params.id}` });
};

// @desc    Create organization line
// @route   POST /api/v1/lines/
// @access  Private
exports.createLine = async (req, res, next) => {
  console.log(req.body);
  const line = await Line.create(req.body);

  res.status(201).json({ success: true, data: line });
};

// @desc    Update organization line
// @route   PUT /api/v1/lines/:id
// @access  Private
exports.updateLine = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update organization line ${req.params.id}` });
};

// @desc    Update organization line
// @route   DELETE /api/v1/lines/:id
// @access  Private
exports.deleteLine = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Delete organization line' });
};
