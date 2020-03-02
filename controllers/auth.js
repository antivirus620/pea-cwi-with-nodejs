const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const isValidUsernameAndPassword = require('../utils/isValidUsernameAndPassword');
const employeeInfo = require('../utils/employeeInfo');
const User = require('../models/User');

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

  if (!user) {
    // ไม่มี User ใน DB ให้ค้นหาใน IDM และสร้างใน DB

    // check valid in idm
    const isValid = await isValidUsernameAndPassword(username, password);

    // if invalid > check username and password in database
    if (!isValid) {
      return next(new ErrorResponse(`Invalid Credential`, 400));
    }

    // get idm info
    const resultIdm = await employeeInfo(username);

    console.log(resultIdm);

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

    // Create user in database
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

    // send user object to create token
  }

  if (user.group === 'pea') {
    // check valid in idm
    const isValid = await isValidUsernameAndPassword(username, password);

    // if invalid > check username and password in database
    if (!isValid) {
      return next(new ErrorResponse(`Invalid Credential`, 401));
    }

    if (user.role !== 'admin') {
      const { peaCode } = await employeeInfo(username);
      user.peaCode = peaCode;
    }

    console.log(user);
  } else if (user.group === 'operator') {
    // check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Password is not match', 401));
    }
  }

  // console.log(user);

  // generate token

  // send response to client

  res.status(200).json({
    success: true,
    data: user
  });
});
