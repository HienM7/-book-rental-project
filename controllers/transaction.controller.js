const db = require('../db');
const shortId = require('shortid');

module.exports.getTransactions = (req, res) => {
  const isAdmin = res.locals.isAdmin;
  const startPage = res.locals.startPage;
  const endPage = res.locals.endPage;
  let transactionList = db.get('transactions').value();
    
  transactionList = transactionList.map(item => {
    const userId = item.userId;
    const bookId = item.bookId;
    return {
      id: item.id,
      user: db.get("users").find({id: userId}).value().name,
      book: db.get("books").find({id: bookId}).value().title,
      userId: userId,
      bookId: bookId,
      isComplete: item.isComplete
    };
  });

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

module.exports.postCreateTransaction = (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const transaction = {
    id: shortId.generate(),
    userId: db.get("users")
      .find({name: req.body.username})
      .value().id,
    bookId: db.get("books")
      .find({title: req.body.bookTitle})
      .value().id,
    isComplete: false
  };
  db.get('transactions').push(transaction).write();
  res.redirect('/transactions');
};

module.exports.getCreateTransaction = (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  res.render('./transactions/create', {
    users: db.get("users").value(),
    books: db.get("books").value(),
  });

};

module.exports.getComplete = (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.params.id;
  const matchTransaction = db.get("transactions").find({id: id}).value();
  if(!matchTransaction) {
    res.send("Id transaction not exist");
    return;
  }
  db.get("transactions")
    .find({id: id})
    .assign({isComplete: true})
    .write();
    res.redirect('back');
};




