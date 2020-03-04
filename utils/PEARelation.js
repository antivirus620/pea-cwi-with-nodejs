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
    query = peaCode.slice(0, 3);
  } else if (office[0].officeLevel === (3 || 4)) {
    query = peaCode.slice(0, 4);
  }

  let pea = await PEAOffice.find({ peaCode: { $regex: `${query}.*` } });

  let aoj = pea.map(eachOffice => {
    return eachOffice['peaCode'];
  });

  return aoj;
};

module.exports = peaRelation;
