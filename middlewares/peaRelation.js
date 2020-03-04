// เอาไว้ทำ array ความสัมพันธ์ของ AOJ ไฟฟ้า
const PEAOffice = require('../models/PEARelation');

const peaRelation = async peaCode => {
  // รับ peaCode มา

  // query peaSchema
  const office = await PEAOffice.findOne({ peaCode });

  console.log(office);

  if (office.officeLevel === 0) {
    let peaArray = [];

    let pea = await PEAOffice.find({ reportTo: peaCode });

    let office = pea.forEach(eachOffice => {
      return eachOffice['peaCode'];
    });

    console.log(office);
  }
};

// loop each statment

// ถ้า peaCode เป็น Z คือดูได้ทุก AOJ แต่แก้ไขไม่ได้

// ถ้า peaCode ได้ LV 0 คือดูได้เฉพาะเขตนั้นๆ

// ถ้า peaCode ได้ LV 1 หรือ 2 ดูตัวเอง และสังกัด

// ถ้า peaCode ได้ LV 3 หรือ 4 ดูเฉพาะตัวเอง

// ส่ง array กลับไป ว่า include หรือเปล่า ถ้า include สามารถแก้ไขงานได้

module.exports = peaRelation;
