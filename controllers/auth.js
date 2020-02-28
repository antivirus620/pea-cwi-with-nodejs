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
  const { username } = req.body;

  // check not type username and password
  // if (!username || !password) {
  //   return next(new ErrorResponse('Please provide an email and password', 400));
  // }

  // check valid in idm
  // const isValid = await isValidUsernameAndPassword(username, password);

  // if invalid > check username and password in database
  // if (!isValid) {
  //   return next(new ErrorResponse(`Invalid Credential`, 400));
  // }

  // if invalid > invalid credential

  // get idm info
  let peaUser = await employeeInfo(username);

  if (!peaUser.success) {
    return next(new ErrorResponse('User not found', 400));
  }

  console.log(peaUser);

  // generate token

  // send response to client

  res.status(200).json({
    success: true,
    data: peaUser
  });
});
