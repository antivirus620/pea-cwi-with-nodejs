// import models
const Line = require('../models/Line');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all organization line
// @route   GET /api/v1/lines
// @access  Public
// * export function
exports.getLines = asyncHandler(async (req, res, next) => {
  // query parameter
  console.log(req.query);

  // มีไว้เพื่อเก็บค่า query แต่ละบรรทัดไปใช้ fecth ข้อมูลจาก DB
  let query;

  // Copy req.query เพื่อเอา variable ไปใช้งานง่ายๆ
  const reqQuery = { ...req.query };

  // * Search by certain field
  // Field to exclude จะไม่เอาไป query บรรทัด excute
  // จะใช้ req.query.select หรือข้อความใดๆ ก็ตามไปใช้กับ mongoose method
  const removeFields = ['select', 'sort'];

  // Loop over array เพื่อลบ object removeFields ออกจากการ query ข้อมูล
  // จะใช้กับ select ข้อมูลแทน
  removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  // * Create operators $gt, $gte, $lt, $lte, $in ต้องแปลงค่าใส่ $ เข้าไปตามสูตรของ mongoose
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // * Finding resource
  query = Line.find(JSON.parse(queryStr));

  // * SELECT Fileds query
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    // fields จะต้องเป็น text เช่น 'tagLine nameLine peaName'
    // เลยปรับจาก array เป็นข้อความยาวๆ join ด้วย space

    query = query.select(fields);
  }

  // * SORT method
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createAt');
    // descending ใช้ minus
  }

  // * Excute query
  const lines = await query;

  res.status(200).json({ success: true, count: lines.length, data: lines });
});

// @desc    Get single organization line
// @route   GET /api/v1/lines/:id
// @access  Public
exports.getLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findById(req.params.id);

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
  const line = await Line.create(req.body);

  res.status(201).json({ success: true, data: line });
});

// @desc    Update organization line
// @route   PUT /api/v1/lines/:id
// @access  Private
exports.updateLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findByIdAndUpdate(req.params.id, req.body, {
    // * อย่าลืมเอาข้อมูลใหม่ ใส่ไปใน arg1
    new: true,
    runValidators: true
  });

  if (!line) {
    return next(
      new ErrorResponse(
        `Organization line not found with id ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: line
  });
});

// @desc    Update organization line
// @route   DELETE /api/v1/lines/:id
// @access  Private
exports.deleteLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findByIdAndDelete(req.params.id);

  if (!line) {
    return next(
      new ErrorResponse(
        `Organization line not found with id ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});

/* NOTE
* ErrorResponse ช่วยเอา message และ status code ส่งให้ client (เฉพาะกรณีหา id ไม่เจอ)
- case อื่นอยู่ใน error.js middleware
- imprement ErrorHandler and ErrorResponse class
* asyncHandler ช่วยลดการเขียน try catch blog
- ถ้าเกิด error ขึนในกรณีอื่นๆ จะส่งเข้าไปใน error.js แล้วส่งข้อความไปแสดงผลใน client

*/
