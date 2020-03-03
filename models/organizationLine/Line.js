const mongoose = require('mongoose');
const slugify = require('slugify');

const LineSchema = new mongoose.Schema(
  {
    peaCode: {
      type: String,
      required: [true, 'Please add a peaCode']
    },
    tagLine: {
      type: String,
      required: [true, 'Please add TAMS tag line'],
      trim: true,
      maxlength: [14, 'Tag can not me more than 14 characters'],
      unique: true
    },
    lineCode: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create lineCode slug from lineName
LineSchema.pre('save', function(next) {
  // ใช้ function ปกติเพราะจะ refer this ใน document ปัจจุบัน ถ้าใช้ arrow function this คือ global scope

  const lineName = this.lineName.split(' ');
  this.lineCode = slugify(lineName[0], {
    lower: true
  });
  next();
});

// Cascade delete results when a line is deleted เมื่อ line ลบ ก็ให้ลบ result
LineSchema.pre('remove', async function(next) {
  // ก่อนลบ line ให้ลบ result (pre)
  // ! ให้ตายยังไงก็ไม่ลบ ต้องไป trigger middleware ด้วย line.remove() ไม่ใช่ findByIdAndDelete
  console.log(`Results being removed from Line ${this._id}`.red.inverse);
  await this.model('Result').deleteMany({ line: this._id });

  next();
});

// Reverse populate with virtuals
LineSchema.virtual('results', {
  // results คือชื่อ field ที่จะแสดง
  ref: 'Result',
  localField: '_id',
  foreignField: 'line',
  justOne: false
});

module.exports = mongoose.model('Line', LineSchema);
