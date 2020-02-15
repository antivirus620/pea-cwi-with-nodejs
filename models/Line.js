const mongoose = require('mongoose');

const LineSchema = new mongoose.Schema({
  peaName: {
    type: String,
    required: [true, 'Please add a PEA Name']
  },
  tagLine: {
    type: String,
    required: [true, 'Please add TAMS tag line'],
    trim: true,
    maxlength: [14, 'Tag can not me more than 14 characters'],
    unique: true
  },
  slug: String,
  lineName: {
    type: String,
    required: [true, 'Please add a organization line name'],
    trim: true,
    maxlength: [300, 'Tag can not me more than 300 characters'],
    unique: true
  },
  totalPole: {
    type: Number,
    required: [true, 'Please add a total pole']
  },
  distance: {
    type: Number,
    required: [true, 'Please add a distance']
  },
  overallPoint: Number,
  year: String,
  peaCrossarm: {
    type: Boolean,
    default: false
  },
  photoBefore: {
    type: String,
    default: 'no-photo.jpg'
  },
  photoAfter: {
    type: String,
    default: 'no-photo.jpg'
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Line', LineSchema);
