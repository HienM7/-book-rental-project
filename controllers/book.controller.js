const shortid = require('shortid');
const db = require('../db');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'helios-m7', 
  api_key: '865547332941444', 
  api_secret: 'mIHwse6VWTOP_3emi3BPrYV7wBw' 
});

module.exports.getBooks = (req, res) => {
  let q="";
  const isAdmin = res.locals.isAdmin;
  if(req.query.q) q = req.query.q;   
  const matchedList = db.get('books').value().filter(item => item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  
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
  }

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
  db.get('books')
    .find({ id: id })
    .assign(bookUpdated)
    .write();
  res.redirect('back');
};

module.exports.deleteBook = (req, res) => {
  const id = req.params.id;
  db.get('books')
    .remove({id: id})
    .write();
  res.redirect('back');
};