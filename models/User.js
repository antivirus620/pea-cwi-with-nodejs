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
    enum: ['user', 'pea', 'operator'],
    default: 'user'
  },
  group: {
    enum: ['tams', 'pea', 'operator'],
    default: 'user'
  },
  firstName: {
    type: String,
    required: [true, 'Please add your frist name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add your frist name']
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
