// มีหน้าที่ extends Class ErrorResponse
// เอา Class ไปใช้รับ message, status code ที่ config ขึ้นมาเอง ใน controllers
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    // เป็นการเรียกใช้งาน message ของ parant class

    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
