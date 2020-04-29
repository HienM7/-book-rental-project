const db = require('../db');
const shortid = require('shortid');

module.exports.addToRent = function(req, res) {
    const bookId = req.params.id;
    const sessionId = req.signedCookies.sessionId;
    if(!sessionId) {
      res.redirect('/books');
    }

    db.get('sessions')
      .find({id: sessionId})
      .update("rent."+ bookId, n => {
        if(!n) return 1;
        return n + 1;
      })
      .write();
    
    res.redirect('/books');

}

module.exports.listRent = function(req, res) {
  const sessionId = req.signedCookies.sessionId;
  if(!sessionId) {
    res.redirect('/books');
  }

  const rent = db.get("sessions")
    .find({id: sessionId})
    .value().rent;

  const listRent = db.get("books")
    .value()
    .filter(book => book.id in rent);
  
  res.render('./books/rent', {
    list: listRent
  });
}

module.exports.submitRent = function(req, res) {
  const sessionId = req.signedCookies.sessionId;
  const userId = req.signedCookies.userId;
  if(!sessionId) {
    res.redirect('/books');
  }

  if(!userId) {
    res.redirect('/auth/login')
  }

  const rent = db.get("sessions")
    .find({id: sessionId})
    .value().rent;

  for(const key in rent) {
    db.get("transactions")
      .push({
        id: shortid.generate(),
        userId: userId,
        bookId: key
      })
      .write();
  }

  db.get("sessions")
    .find({id: sessionId})
    .assign({rent: {}})
    .write();

  res.redirect("/transactions");

}