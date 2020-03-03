const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const isValidUsernameAndPassword = require('../utils/isValidUsernameAndPassword');
const employeeInfo = require('../utils/employeeInfo');
const User = require('../models/User');

// @desc    Register
// @route   POST /api/v1/auth/register
// @access  Public

// @desc    Login
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // check not type username and password
  if (!username || !password) {
    return next(
      new ErrorResponse('Please provide an username and password', 400)
    );
  }

  // find username, password in mongoDB
  let user = await User.findOne({ username }).select('+password');

  if (!user || user['group'] === 'pea') {
    // กรณีเป็น USER ของ PEA หรือ ไม่มี USER นี้ในระบบ

    // check valid in idm
    const isValid = await isValidUsernameAndPassword(username, password);

    // username ถูก แต่ password ไม่ถูกต้อง
    if (!isValid.result) {
      return next(new ErrorResponse(`${isValid.message}`, 401));
    }

    // ถ้าข้อมูลถูกต้อง เอาข้อมูล IDM มาแสดง
    const resultIdm = await employeeInfo(username);

    // กรณีไม่มีข้อมูลใน IDM
    if (!resultIdm.result) {
      return next(
        new ErrorResponse(
          `Username ${username} is not found in IDM Server `,
          404
        )
      );
    }
    // get EmployeeInfo
    const { titleName, firstName, lastName, email, peaCode } = resultIdm.user;

    // ยังไม่มี USER นี้ใน mongoDB
    if (!user) {
      user = await User.create({
        username,
        titleName,
        firstName,
        lastName,
        password,
        email,
        peaCode,
        role: 'user',
        group: 'pea',
        company: 'pea'
      });
    }

    // กรณี admin จะดูได้ทุกพื้นที่
    if (user.role !== 'admin') {
      user.peaCode = peaCode;
    }
  }

  if (user['group'] === 'operator') {
    // USER ที่เป็นพวก OPERATOR หรืออื่นๆ

    // check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Password is not match', 401));
    }
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get Current User
// @route   POST /api/v1/auth/me
// @access  Private

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private

// @desc    By pass
// @route   POST /api/v1/auth/bypass
// @access  Private/Admin

// @desc    UPDATE password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public

// sign token
