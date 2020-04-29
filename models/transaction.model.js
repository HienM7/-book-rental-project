const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: String,
  userId: String,
  bookId: String,
  isComplete: {type: Boolean, default: false}
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;
