const asyncHandler = fn => (req, res, next) =>
  // เรียก try...catch blog และสั่ง next(err) ให้ถ้าหากมี error เกิดขึ้นใน controllers
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
