// import models
const Result = require('../models/Result');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all result
// @route   GET /api/v1/results
// @route   GET /api/v1/lines/:lineId/results
// @access  Public
exports.getResults = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.lineId) {
    query = Result.find({ line: req.params.lineId });
  } else {
    query = Result.find();
  }

  results = await query;

  res.status(200).json({ success: true, count: results.length, data: results });
});
