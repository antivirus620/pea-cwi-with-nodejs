// เอาไว้ทำ array ความสัมพันธ์ของ AOJ ไฟฟ้า
const PEAOffice = require('../models/PEARelation');

const peaRelation = async peaCode => {
  let query;

  const office = await PEAOffice.find({ peaCode });

  // รับ peaCode มา
  if (office[0].peaCode.slice(0, 1) === 'Z') {
    query = '';
  } else if (
    office[0].officeLevel === 0 &&
    office[0].peaCode.slice(0, 1) !== 'Z'
  ) {
    query = peaCode.slice(0, 1);
  } else if (office[0].officeLevel === (1 || 2)) {
    query = peaCode.slice(0, 2);
  } else if (office[0].officeLevel === (3 || 4)) {
    query = peaCode.slice(0, 3);
  }

  let pea = await PEAOffice.find({ peaCode: { $regex: `${query}.*` } });

  let aoj = pea.map(eachOffice => {
    return eachOffice['peaCode'];
  });

  console.log(aoj);
};

// loop each statment

// ถ้า peaCode เป็น Z คือดูได้ทุก AOJ แต่แก้ไขไม่ได้

// ถ้า peaCode ได้ LV 0 คือดูได้เฉพาะเขตนั้นๆ

// ถ้า peaCode ได้ LV 1 หรือ 2 ดูตัวเอง และสังกัด

// ถ้า peaCode ได้ LV 3 หรือ 4 ดูเฉพาะตัวเอง

// ส่ง array กลับไป ว่า include หรือเปล่า ถ้า include สามารถแก้ไขงานได้

module.exports = peaRelation;
