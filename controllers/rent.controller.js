const db = require('../db');
const Session = require('../models/session.model');
const Book = require('../models/book.model');
const Transaction = require('../models/transaction.model');

const shortid = require('shortid');

module.exports.addToRent = async function(req, res) {
    const bookId = req.params.id;
    const sessionId = req.signedCookies.sessionId;
    if(!sessionId) {
      res.redirect('/books');
    }
    let sessionFind = await Session.find({id: sessionId })
    let count = sessionFind[0]["rent"][bookId] || 0;

    await Session.updateOne({id: sessionId},{["rent."+ bookId]: count + 1});
    
    res.redirect('/books');

}

module.exports.listRent = async function(req, res) {
  let sessionId = req.signedCookies.sessionId;
  if(!sessionId) {
    res.redirect('/books');
    return;
  }

  let session = await Session.findOne({id: sessionId});
  if(!session) {
    res.redirect('/books');
    return;
  }
  let rent = session.rent;

  let listRent = await Book.find();

  listRent = listRent.filter(book => book.id in rent);
 
  res.render('./books/rent', {
    list: listRent
  });
}

module.exports.submitRent = async function(req, res) {
  const sessionId = req.signedCookies.sessionId;
  const userId = req.signedCookies.userId;
  if(!sessionId) {
    res.redirect('/books');
  }

  if(!userId) {
    res.redirect('/auth/login')
  }

  let session = await Session.findOne({id: sessionId});
  if(!session) {
    res.redirect('/books');
    return;
  }
  rent = session.rent;

  for(const key in rent) {
    await Transaction.create({
      id: shortid.generate(),
      userId: userId,
      bookId: key
    })
  }
  await Session.updateOne({id: sessionId}, {rent: {}});

  res.redirect("/transactions");

}