const errorHandler = (err, req, res, next) => {
  // เป็น function ธรรมดาที่เอาไว้ใช้ใน middleware
  // ใช้คู่กับ function next(err) ใน controllers
  console.log(err.stack.red);
  // ใช้ color ได้เพราะ function ถูกเรียกใน server.js

  // เอา errorResponse มา improve คู่กับ error handler
  // รับ statusCode จาก controllers หรือ defaulte 500
  res.status(err.statusCode || 500).json({
    sucess: false,
    error: err.message || `Server Error`
  });
};

module.exports = errorHandler;
