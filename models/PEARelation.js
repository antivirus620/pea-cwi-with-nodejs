const mongoose = require('mongoose');

const PEARelation = new mongoose.Schema({
  peaCode: {
    type: String,
    required: [true, 'Please add PEA Code'],
    maxlength: 6,
    unique: true,
    text: true
  },
  peaNameBySAP: {
    type: String,
    required: [true, 'Please add PEA Abb. Name']
  },
  peaOffice: {
    type: String,
    required: [true, 'Please add PEA Office'],
    maxlength: 4
  },
  officeLevel: {
    type: Number,
    required: [true, 'Please add PEA office level']
  },
  reportTo: {
    type: String,
    required: [true, 'Please add PEA relation report'],
    maxlength: 6
  },
  rawCodeByGIS: String,
  province: String,
  region: Number,
  area: Number
});
PEARelation.path('peaCode').index({ text: true });

module.exports = mongoose.model('PEARelation', PEARelation);
