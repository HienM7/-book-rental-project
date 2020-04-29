const db = require('../db');

module.exports = (req, res, next) => {
  let isAdmin = false;
  if (req.signedCookies.userId) {
    isAdmin = db.get("users").find({id: req.signedCookies.userId}).value().isAdmin;
  }
  res.locals.isAdmin = isAdmin;
  next();
}