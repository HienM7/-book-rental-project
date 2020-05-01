const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  id: String,
  userId: String,
  rent: {type: Object, default: {}}
});

const Rent = mongoose.model('Rent', rentSchema, 'rents');

module.exports = Rent;
