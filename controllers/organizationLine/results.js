// import models
const Result = require('../../models/organizationLine/Result');
const Line = require('../../models/organizationLine/Line');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middlewares/async');

// @desc    Get all result
// @route   GET /api/v1/results
// @route   GET /api/v1/lines/:lineId/results
// @access  Public
exports.getResults = asyncHandler(async (req, res, next) => {
  if (req.params.lineId) {
    const results = await Result.find({ line: req.params.lineId });
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } else {
    return res.status(200).json(res.advanceResults);
  }
});

// @desc    Get result
// @route   GET /api/v1/results/:id
// @access  Public
exports.getResult = asyncHandler(async (req, res, next) => {
  const result = await Result.findById(req.params.id).populate({
    path: 'line',
    select: 'peaCode lineName'
  });

  if (!result) {
    return next(
      new ErrorResponse(`No result with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({ success: true, count: result.length, data: result });
});

// @desc    Create result
// @route   POST /api/v1/lines/:lineId/results
// @access  Private
exports.addResult = asyncHandler(async (req, res, next) => {
  // refer to result model ใช้ lineId เป็นตัวร่วม
  req.body.line = req.params.lineId;

  // ค้นหาเส้นทางก่อนว่ามีใน database มั้ย
  const line = await Line.findById(req.params.lineId);

  if (!line) {
    return next(
      new ErrorResponse(`No line with the id of ${req.params.lineId}`),
      400
    );
  }

  // เช็คว่า user นี้อยู่ในพื้นที่ AOJ นี้หรือไม่
  if (!req.user.aoj.includes(line.peaCode)) {
    return next(
      new ErrorResponse(
        `You can not authorize in PEA Code ${line.peaCode}`,
        401
      )
    );
  }

  const result = await Result.create(req.body);

  // ! อย่าลืมไป add to routes ใช้อันที่มาจาก lines route

  res.status(201).json({ success: true, data: result });
});

// @desc    Update result
// @route   PUT /api/v1/results/:id
// @access  Private
exports.updateResult = asyncHandler(async (req, res, next) => {
  // ค้นหาเส้นทางก่อนว่ามีใน database มั้ย
  let result = await Result.findById(req.params.id);

  if (!result) {
    return next(
      new ErrorResponse(`No result with the id of ${req.params.id}`),
      404
    );
  }

  const line = await Line.findById(result.line);

  // เช็คว่า user นี้อยู่ในพื้นที่ AOJ นี้หรือไม่
  if (!req.user.aoj.includes(line.peaCode)) {
    return next(
      new ErrorResponse(
        `You can not authorize in PEA Code ${line.peaCode}`,
        401
      )
    );
  }

  result = await Result.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: result });
});

// @desc    Delete result
// @route   DELETE /api/v1/results/:id
// @access  Private
exports.deleteResult = asyncHandler(async (req, res, next) => {
  // ค้นหาเส้นทางก่อนว่ามีใน database มั้ย
  const result = await Result.findById(req.params.id);

  if (!result) {
    return next(
      new ErrorResponse(`No result with the id of ${req.params.id}`),
      404
    );
  }

  const line = await Line.findById(result.line);

  // เช็คว่า user นี้อยู่ในพื้นที่ AOJ นี้หรือไม่
  if (!req.user.aoj.includes(line.peaCode)) {
    return next(
      new ErrorResponse(
        `You can not authorize in PEA Code ${line.peaCode}`,
        401
      )
    );
  }

  // ใช้ findById แล้วมา remove ทีหลังเพราะจะใช้ mongoose pre middleware
  await result.remove();

  res.status(200).json({ success: true, data: {} });
});
