const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // เป็น function ธรรมดาที่เอาไว้ใช้ใน middleware
  // ใช้คู่กับ function next(err) ใน controllers

  let error = { ...err };

  // หา case Error
  console.log(err);

  // *Setting ERROR case
  // Mongoose bad ObjectId (หาไม่เจอ หรือไม่ถูก format)
  if (err.name === 'CastError') {
    // * CastError กรณี id กรอกเข้ามาไม่ถูกต้อง
    // ใช้ได้กับ get, update, delete แต่ละ id
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  // ไม่มีชื่อ ให้เช็คจาก error object
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  // ValidatorError field ที่ required ไม่ได้กรอก
  if (err.name === 'ValidationError') {
    // ข้างใน err object มี { errors: field : { massage: 'Please add bla bla' } }
    // Object.values คือเอา object มาแค่ value แล้ว map เป็น array
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // *Send error response to client จะ set ทั้ง CASE และ Default
  res.status(error.statusCode || 500).json({
    sucess: false,
    error: error.message || `Server Error`
  });
};

module.exports = errorHandler;
