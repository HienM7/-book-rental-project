const db = require('../db');

module.exports = (req, res, next) => {
  const isAdmin = db.get("users").find({id: req.signedCookies.userId}).value().isAdmin;
  if(!isAdmin) {
    res.redirect('back');
    return;
  }
  next();
}