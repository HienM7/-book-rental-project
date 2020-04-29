const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  pass: String,
  isAdmin: {type: Boolean, default: false},
  wrongLoginCount: {type: Number, default: 0},
  sentEmail: {type: Boolean, default: false},
  path: String,
  avatarUrl: String,
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
