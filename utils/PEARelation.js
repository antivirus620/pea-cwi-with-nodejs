const mongoose = require('mongoose');

const PEARelationSchema = new mongoose.Schema({
  peaCode: {
    type: String,
    required: [true, 'Please add PEA code'],
    unique: true,
    maxlength: 6
  },
  peaNameBySAP: {
    type: String
  },
  peaOffice: {
    type: String,
    required: [true, 'Please add PEA office'],
    unique: true,
    maxlength: 4
  },
  officeLevel: {
    type: Number,
    required: [true, 'Please add PEA office level']
  },

  reportTo: String,
  rawPEAFullname: {
    type: String,
    required: [true, 'Please add PEA full name']
  },
  rawCodeByGIS: {
    type: Number,
    required: [true, 'Please add PEA GIS code number'],
    maxlength: 6
  },
  province: {
    type: String,
    required: [true, 'Please add province']
  },
  region: {
    type: Number,
    required: [true, 'Please add PEA region']
  },
  area: {
    type: Number,
    required: [true, 'Please add PEA area']
  }
});

module.exports = mongoose.model('PEARelation', PEARelationSchema);
