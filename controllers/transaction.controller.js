const db = require('../db');
const shortId = require('shortid');
const User = require('../models/user.model');
const Book = require('../models/book.model');
const Transaction = require('../models/transaction.model');

module.exports.getTransactions = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  const startPage = res.locals.startPage;
  const endPage = res.locals.endPage;
  let transactionList = await Transaction.find();

  for(let i = 0; i < transactionList.length; ++i) {
    const userId =  transactionList[i].userId;
    const bookId =  transactionList[i].bookId;
    const id =  transactionList[i].id;
    const isComplete =  transactionList[i].isComplete;

    let bookTitle = await Book.findOne({id: bookId});
    let userName = await User.findOne({id: userId});
    bookTitle = bookTitle.title;
    userName = userName.name;
    transactionList[i] = {
      id: id,
      user: userName,
      book: bookTitle,
      userId: userId,
      bookId: bookId,
      isComplete: isComplete
    };
  }

  if(!isAdmin) {
    transactionList = transactionList.filter(item => 
      item.userId === req.signedCookies.userId
    )
    res.render('./transactions/userTransactions', {
      transactionList: transactionList.slice(startPage, endPage)
    });
    return;
  }

  res.render('./transactions/transactions', {
    transactionList: transactionList.slice(startPage, endPage)
  });
};

module.exports.postCreateTransaction = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const user = await User.findOne({name: req.body.username});
  const book = await Book.findOne({title: req.body.bookTitle});
  const transaction = {
    id: shortId.generate(),
    userId: user.id,
    bookId: book.id,
    isComplete: false
  };
  await Transaction.create(transaction);
  res.redirect('/transactions');
};

module.exports.getCreateTransaction = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const users = await User.find();
  const books = await Book.find();

  res.render('./transactions/create', {
    users: users,
    books: books,
  });

};

module.exports.getComplete = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.params.id;
  const matchTransaction = await Transaction.findOne({id: id});
  if(!matchTransaction) {
    res.send("Id transaction not exist");
    return;
  }

  await Transaction.updateOne({id: id}, {isComplete: true});
    res.redirect('back');
};




