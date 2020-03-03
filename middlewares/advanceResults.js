const advanceResults = (model, populate) => async (req, res, next) => {
  // มีไว้เพื่อเก็บค่า query แต่ละบรรทัดไปใช้ fecth ข้อมูลจาก DB
  let query;

  // Copy req.query เพื่อเอา variable ไปใช้งานง่ายๆ
  const reqQuery = { ...req.query };

  // * Search by certain field
  // Field to exclude จะไม่เอาไป query บรรทัด excute
  // จะใช้ req.query.select หรือข้อความใดๆ ก็ตามไปใช้กับ mongoose method
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over array เพื่อลบ object removeFields ออกจากการ query ข้อมูล
  // จะใช้กับ select ข้อมูลแทน
  removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  // * Create operators $gt, $gte, $lt, $lte, $in ต้องแปลงค่าใส่ $ เข้าไปตามสูตรของ mongoose
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // * Finding resource
  query = model.find(JSON.parse(queryStr));

  // * SELECT Fileds query
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    // fields จะต้องเป็น text เช่น 'tagLine nameLine peaName'
    // เลยปรับจาก array เป็นข้อความยาวๆ join ด้วย space

    query = query.select(fields);
  }

  // * SORT method
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createAt');
    // descending ใช้ minus
  }

  // * Limit and Pagination
  // ! อย่าลืมตั้งค่าฐาน 10 ให้ ParseInt method
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;
  const total = await model.countDocuments(reqQuery);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Init pagination
  const pagination = {};

  if (endIndex < total) {
    // ก่อนหน้าสุดท้าย
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    // หน้าที่สองเป็นต้นไป
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  if (populate) {
    // populate field virtuals
    query = query.populate(populate);
  }

  // สั่งให้แสดงผลข้อมูล skip = skip document ตามที่บอก กับ limit = maximum document
  query = query.skip(startIndex).limit(limit);

  // * Excute query
  const results = await query;

  res.advanceResults = {
    success: true,
    count: results.length,
    total,
    pagination,
    data: results
  };

  next();
};

module.exports = advanceResults;
