// import models
const Line = require('../../models/organizationLine/Line');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middlewares/async');
const peaRealtion = require('../../utils/peaRelation');

// @desc    Get all organization line
// @route   GET /api/v1/lines
// @access  Public
// * export function
exports.getLines = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});

// @desc    Get single organization line
// @route   GET /api/v1/lines/:id
// @access  Public
exports.getLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findById(req.params.id).populate('results');

  if (!line) {
    // *err ตรงนี้คือ id ถูก แต่หาไม่เจอใน database ส่วน try...catch คือ error จากระบบ
    return next(
      new ErrorResponse(
        `Organization line not found with id ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: line });
});

// @desc    Create organization line
// @route   POST /api/v1/lines/
// @access  Private
exports.createLine = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createByUser = req.user.id;

  // Add PEA owner
  req.body.peaCode = req.user.peaCode;

  const line = await Line.create(req.body);

  res.status(201).json({ success: true, data: line });
});

// @desc    Update organization line
// @route   PUT /api/v1/lines/:id
// @access  Private
exports.updateLine = asyncHandler(async (req, res, next) => {
  req.body.lastUpdateByUser = req.user.id;

  let line = await Line.findById(req.params.id);

  if (!line) {
    return next(
      new ErrorResponse(
        `Organization line not found with id ${req.params.id}`,
        404
      )
    );
  }

  // เช็คว่า user นี้อยู่ในพื้นที่ AOJ นี้หรือไม่
  if (!req.user.aoj.includes(line.peaCode)) {
    return next(
      new ErrorResponse(
        `You can not update data in PEA Code ${line.peaCode}`,
        401
      )
    );
  }

  line = await Line.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: line
  });
});

// @desc    Update organization line
// @route   DELETE /api/v1/lines/:id
// @access  Private
exports.deleteLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findById(req.params.id);

  if (!line) {
    return next(
      new ErrorResponse(
        `Organization line not found with id ${req.params.id}`,
        404
      )
    );
  }

  // เช็คว่า user นี้อยู่ในพื้นที่ AOJ นี้หรือไม่
  if (!req.user.aoj.includes(line.peaCode)) {
    return next(
      new ErrorResponse(
        `You can not delete line in PEA Code ${line.peaCode}`,
        401
      )
    );
  }

  // ! จะ trigger delete แบบ CASCADE ทั้ง Line และ Result model
  line.remove();

  res.status(200).json({ success: true, data: {} });
});

/* NOTE
* ErrorResponse ช่วยเอา message และ status code ส่งให้ client (เฉพาะกรณีหา id ไม่เจอ)
- case อื่นอยู่ใน error.js middleware
- imprement ErrorHandler and ErrorResponse class
* asyncHandler ช่วยลดการเขียน try catch blog
- ถ้าเกิด error ขึนในกรณีอื่นๆ จะส่งเข้าไปใน error.js แล้วส่งข้อความไปแสดงผลใน client

*/
