// import models
const Line = require('../models/Line');

// @desc    Get all organization line
// @route   GET /api/v1/lines
// @access  Public
// * export function
exports.getLines = async (req, res, next) => {
  try {
    const lines = await Line.find();

    res.status(200).json({ success: true, count: lines.length, data: lines });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single organization line
// @route   GET /api/v1/lines/:id
// @access  Public
exports.getLine = async (req, res, next) => {
  try {
    // * try...catch มีไว้กรณี error จะส่ง response ไปหา client ด้วย
    const line = await Line.findById(req.params.id);

    if (!line) {
      // คือหาไม่เจอใน database ส่วน try...catch คือ error จากระบบ
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: line });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create organization line
// @route   POST /api/v1/lines/
// @access  Private
exports.createLine = async (req, res, next) => {
  const line = await Line.create(req.body);

  res.status(201).json({ success: true, data: line });
};

// @desc    Update organization line
// @route   PUT /api/v1/lines/:id
// @access  Private
exports.updateLine = async (req, res, next) => {
  try {
    const line = await Line.findByIdAndUpdate(req.params.id, req.body, {
      // * อย่าลืมเอาข้อมูลใหม่ ใส่ไปใน arg1
      new: true,
      runValidators: true
    });

    if (!line) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: line
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update organization line
// @route   DELETE /api/v1/lines/:id
// @access  Private
exports.deleteLine = async (req, res, next) => {
  try {
    const line = await Line.findByIdAndDelete(req.params.id);

    if (!line) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
