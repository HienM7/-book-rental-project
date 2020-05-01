const shortid = require('shortid');
const Book = require('../../models/book.model');

module.exports.getBooks = async (req, res) => {
  let books = await Book.find();
  res.json(books);
}

