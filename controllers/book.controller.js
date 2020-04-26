const shortid = require('shortid');
const db = require('../db');

module.exports.getBooks = (req, res) => {
  let q="";
  if(req.query.q) q = req.query.q;   
  const matchedList = db.get('books').value().filter(item => item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('./books/books', {
    list: matchedList,
    q: q
  });
};

module.exports.postCreateBook = (req, res) => {
  const book = {
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  };
  db.get('books').push(book).write();
  res.redirect('/books');
};

module.exports.getCreateBook = (req, res) => {
  res.render('./books/create');
};

module.exports.getUpdateBook = (req, res) => {
  const id = req.params.id;
  const book = db.get('books').find({id: id}).value();
  res.render('./books/update', {
    book: book
  });
};

module.exports.postUpdateBook = (req, res) => {
  const id = req.body.id;
  const bookUpdated = {
    title: req.body.title,
    description: req.body.description
  };
  db.get('books')
    .find({ id: id })
    .assign(bookUpdated)
    .write();
  res.redirect('/books');
};

module.exports.deleteBook = (req, res) => {
  const id = req.params.id;
  db.get('books').remove({id: id}).value();
  res.redirect('back');
};