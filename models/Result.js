const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  line: {
    type: mongoose.Schema.ObjectId,
    ref: 'Line',
    required: true
  },
  resultMethod01: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod01: String,
  resultMethod02: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod02: String,
  resultMethod03: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการโดย Operator', 'ดำเนินการโดย PEA']
  },
  detailMethod03: String,
  resultMethod04: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod04: String,
  resultMethod05: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod05: String,
  resultMethod06: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod06: String,
  resultMethod07: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod07: String,
  resultMethod08: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod08: String,
  resultMethod09: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod09: String,
  resultMethod10: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod10: String,
  resultMethod11: {
    type: Number,
    default: 0,
    min: [0, 'Result must be at lease 0']
  },
  detailMethod11: String,
  resultMethod12: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod12: String,
  resultMethod13: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod13: String,
  resultMethod14: {
    type: String,
    default: 'ยังไม่ดำเนินการ',
    enum: ['ยังไม่ดำเนินการ', 'ดำเนินการแล้ว']
  },
  detailMethod14: String,
  avgResult: Number,
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', ResultSchema);
