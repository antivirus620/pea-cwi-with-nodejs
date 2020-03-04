const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const peaRelation = require('../middlewares/peaRelation');
const isValidUsernameAndPassword = require('../utils/idmServices/isValidUsernameAndPassword');
const employeeInfo = require('../utils/idmServices/employeeInfo');
const User = require('../models/User');

// @desc    Register
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const {
    username,
    email,
    password,
    titleName,
    firstName,
    lastName,
    company
  } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    titleName,
    firstName,
    lastName,
    company
  });

  // send token and cookie to client
  sendTokenResponse(user, 200, res);
});

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
    // กรณีไม่มี USER นี้ในระบบ

    // check valid in idm
    const isValid = await isValidUsernameAndPassword(username, password);

    // username ถูก แต่ password ไม่ถูกต้อง
    if (!isValid.result) {
      return next(new ErrorResponse(`Username and password is not found`, 404));
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

    user = await User.create({
      username,
      titleName,
      firstName,
      lastName,
      password,
      email,
      peaCode,
      role: 'pea',
      group: 'pea',
      company: 'pea'
    });
  }

  if (user['group'] === 'operator') {
    // USER ที่เป็นพวก OPERATOR หรืออื่นๆ

    // check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Password is not match', 401));
    }
  } else if (user['group'] === 'pea') {
    // check valid in idm
    const isValid = await isValidUsernameAndPassword(username, password);

    // username ถูก แต่ password ไม่ถูกต้อง
    if (!isValid.result) {
      return next(new ErrorResponse(`${isValid.message}`, 401));
    }

    // fetch employeeInfo
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

    if (user['role'] !== 'admin') {
      // for PEA user if info change update in db
      const { titleName, firstName, lastName, email, peaCode } = resultIdm.user;

      if (
        user['titleName'] !== titleName ||
        user['firstName'] !== firstName ||
        user['lastName'] !== lastName ||
        user['email'] !== email ||
        user['peaCode'] !== peaCode
      ) {
        user = await User.findByIdAndUpdate(user._id, resultIdm.user, {
          new: true,
          runValidators: true
        });
      }
    }
  }

  // send token and cookie to client
  sendTokenResponse(user, 200, res);
});

// @desc    Get Current User
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const { peaCode } = user;

  const office = await peaRelation(peaCode);

  // console.log(office);

  res.status(200).json({
    success: true,
    data: user
  });
});

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

// * Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignJwtToken();

  // option for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 100
    ),
    httpOnly: true // for client side script
  };

  // set sucure cookie
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // send to client
  res
    .status(200)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};
