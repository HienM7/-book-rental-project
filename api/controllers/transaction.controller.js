const Transaction = require('../../models/transaction.model');

module.exports.getTransactions = async (req, res) => {
  let transactionList = await Transaction.find();
  res.json(transactionList);
}