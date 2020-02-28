const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const employeeInfo = require('../utils/employeeInfo');
const isValidUsernameAndPassword = require('../utils/isValidUsernameAndPassword');
const User = require('../models/User');

// @desc    Bypass user to login
// @route   POST /api/v1/auth/login
// @access  Private/Admin
exports.bypassUser = asyncHandler(async (req, res, next) => {
  // รับ username แล้วเอาข้อมูลไปสร้าง TOKEN
  // const { username } = req.body;
  // // PEA user เช็คใน idm ก่อน
  // let user = await employeeInfo(username);
  // if (!user) {
  //   user = await User.findOne({ username })
  // }
  // Operator user เช็คใน database
});
