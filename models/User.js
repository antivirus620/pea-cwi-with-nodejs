const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username']
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
  role: {
    type: String,
    enum: ['user'],
    default: 'user'
  },
  group: {
    type: String,
    enum: ['operator', 'pea'],
    default: 'pea'
  },
  firstName: {
    type: String,
    required: [true, 'Please add your fristname']
  },
  lastName: {
    type: String,
    required: [true, 'Please add your lastname']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
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

module.exports = mongoose.model('User', UserSchema);
