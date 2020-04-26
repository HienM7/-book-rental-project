const shortid = require('shortid');
const db = require('../db');

module.exports.getUsers = (req, res) => {
  let q = req.query.q || "";
  const startPage = res.locals.startPage;
  const endPage = res.locals.endPage;
  const matchedList = db.get('users').value().filter(item => item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('./users/users', {
    list: matchedList.slice(startPage, endPage),
    q: q
  });
};

module.exports.postCreateUser = (req, res) => {
  db.get('users')
    .push({
      name: req.body.name,
      id: shortid.generate()
    })
    .write();
  
    res.redirect('/users');
};

module.exports.getCreateUser = (req, res) => {
  res.render('./users/create');
};

module.exports.getUpdateUser = (req, res) => {
  const id = req.params.id;
  const user = db.get('users').find({id: id}).value();
  res.render('./users/update', {
    user: user
  });
};

module.exports.postUpdateUser = (req, res) => {
  const id = req.body.id;
  const userUpdated = {
    name: req.body.name
  };
  db.get('users')
    .find({ id: id })
    .assign(userUpdated)
    .write();
  res.redirect('/users');
};

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.get('users').remove({id: id}).value();
  res.redirect('back');
};
