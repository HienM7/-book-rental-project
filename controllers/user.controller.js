const shortid = require('shortid');
const db = require('../db');
const User = require('../models/user.model');

module.exports.getUsers = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  let q = req.query.q || "";
  const startPage = res.locals.startPage;
  const endPage = res.locals.endPage;
  let matchedList = await User.find();
  matchedList = matchedList.filter(item => item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('./users/users', {
    list: matchedList.slice(startPage, endPage),
    q: q
  });
};

module.exports.postCreateUser = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  
  await User.create({
    name: req.body.name,
    id: shortid.generate()
  })
  
    res.redirect('/users');
};

module.exports.getCreateUser = (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  res.render('./users/create');
};

module.exports.getUpdateUser = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.params.id;
  const user = await User.findOne({id: id});
  res.render('./users/update', {
    user: user
  });
};

module.exports.postUpdateUser = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.body.id;
  const userUpdated = {
    name: req.body.name
  };
  await User.updateOne({ id: id }, userUpdated);
  res.redirect('/users');
};

module.exports.deleteUser = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.params.id;
  await User.deleteOne({id: id});
  res.redirect('back');
};
