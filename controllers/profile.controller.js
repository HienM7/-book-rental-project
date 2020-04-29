const db = require('../db');
const User = require('../models/user.model');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'helios-m7', 
  api_key: '865547332941444', 
  api_secret: 'mIHwse6VWTOP_3emi3BPrYV7wBw' 
});


module.exports.getUpdateUser = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.params.id;
  const user = await User.find({id: id});
  res.render('./users/profile', {
    user: user[0]
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
  await User.updateOne({ id: id }, userUpdated)
  res.redirect('/users');
};


module.exports.getUpdateAvatar = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.params.id;
  const user = await User.find({id: id});
  res.render('./users/updateAvatar', {
    user: user[0]
  });
};

module.exports.postUpdateAvatar = async (req, res) => {
  const isAdmin = res.locals.isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  const id = req.body.id;
  const userUpdated = {
    path: req.file.path
  };
  try {
    const response = await cloudinary.uploader.upload(req.file.path);
    console.log(response);
    userUpdated.avatarUrl = response.url;
  } catch(error) {
    console.log(error);
  }
  console.log("////////////////////////");
  await User.updateOne({ id: id }, userUpdated)
  res.redirect('back');
};