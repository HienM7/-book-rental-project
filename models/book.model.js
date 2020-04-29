const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: String,
  title: String, 
  description: String,
  path: String,
  coverUrl: String
});

const Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;
