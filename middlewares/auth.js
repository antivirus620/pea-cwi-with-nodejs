const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  // มีเพื่อ protect route จะให้ access เฉพาะคนที่ login (มี token หรือ cookie)
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // รับ token code หลังคำว่า Bearer
    token = req.headers.authorization.split(' ')[1];
  }

  // ใช้กับ token ใน browser
  // else if (req.cookies.totken) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new errorResponse('Not authorize to access this route', 401));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // จะมี user เมื่อมี token
    console.log(decoded);

    // เอา user ไปใช้งานต่อที่ route ผ่าน req.user
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new errorResponse('Not authorize to access this route', 401));
  }
});
