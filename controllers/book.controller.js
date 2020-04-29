const shortid = require('shortid');
const Book = require('../models/book.model');
const db = require('../db');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'helios-m7', 
  api_key: '865547332941444', 
  api_secret: 'mIHwse6VWTOP_3emi3BPrYV7wBw' 
});

module.exports.getBooks = async (req, res) => {
  let q="";
  const isAdmin = res.locals.isAdmin;
  if(req.query.q) q = req.query.q;   
  let matchedList = await Book.find()
  matchedList = matchedList.filter(item => item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  
  if(isAdmin) {
    res.render('./books/books', {
      list: matchedList,
      q: q
    });
    return;
  }
  res.render('./books/library', {
    list: matchedList,
    q: q
  });

};

module.exports.postCreateBook = async (req, res) => {
  
  const book = {
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description,
    path:  req.file.path
  };
  try {
    const response = await cloudinary.uploader.upload(req.file.path);
    book.coverUrl = response.url;
  } catch(error) {
    console.log(error);
    return;
  }

  Book.create(book);
  res.redirect('/books');
};

module.exports.getCreateBook = (req, res) => {
  res.render('./books/create');
};

module.exports.getUpdateBook = async (req, res) => {
  const id = req.params.id;
  const book = await Book.find({id: id});
  res.render('./books/update', {
    book: book[0]
  });
};

module.exports.postUpdateBook = async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const bookUpdated = {
    title: title,
    description: description,
    path: req.file.path
  };
  try {
    const response = await cloudinary.uploader.upload(req.file.path);
    bookUpdated.coverUrl = response.url;
  } catch(error) {
    console.log(error);
  }
  await Book.updateOne({ id: id }, bookUpdated);
  res.redirect('back');
};

module.exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  await Book.deleteOne({id: id})
  res.redirect('back');
};