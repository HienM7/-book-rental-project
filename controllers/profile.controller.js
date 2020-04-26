const db = require('../db');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'helios-m7', 
  api_key: '865547332941444', 
  api_secret: 'mIHwse6VWTOP_3emi3BPrYV7wBw' 
});


module.exports.getUpdateUser = (req, res) => {
  const id = req.params.id;
  const user = db.get('users').find({id: id}).value();
  res.render('./users/profile', {
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


module.exports.getUpdateAvatar = (req, res) => {
  const id = req.params.id;
  const user = db.get('users').find({id: id}).value();
  res.render('./users/updateAvatar', {
    user: user
  });
};

module.exports.postUpdateAvatar = async (req, res) => {
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
  db.get('users')
    .find({ id: id })
    .assign(userUpdated)
    .write();
  res.redirect('back');
};