const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id: String,
  rent: {type: Object, default: {}}
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;
