const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  peaCode: {
    type: String,
    required: [true, 'Please add PEA code'],
    default: 'Z00000'
  },
  titleName: {
    type: String,
    required: [true, 'Please add your title name'],
    default: 'นาย'
  },
  firstName: {
    type: String,
    required: [true, 'Please add your fristname']
  },
  lastName: {
    type: String,
    required: [true, 'Please add your lastname']
  },
  role: {
    type: String,
    enum: ['user'],
    default: 'user'
  },
  group: {
    type: String,
    enum: ['operator', 'pea'],
    default: 'operator'
  },
  company: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  // ใช้แบบ Async
  const salt = await bcrypt.genSalt(10);

  // เก็บ hash ลง DB แบบ asynchronous
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// ใช้ methods : เอาผลจาก UserSchema ไปใช้ใน controllers
UserSchema.methods.matchPassword = async function(enteredPassword) {
  // return true or false
  return await bcrypt.compare(enteredPassword, this.password);
};

// * SIGN JWT and Return
UserSchema.methods.getSignJwtToken = function() {
  return jwt.sign(
    {
      _id: this.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE
    }
  );
};

module.exports = mongoose.model('User', UserSchema);
