const db = require('../db');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  let isAdmin = false;
  if (req.signedCookies.userId) {
    const user = await User.findOne({id: req.signedCookies.userId});
    isAdmin = user.isAdmin;
  }
  res.locals.isAdmin = isAdmin;
  next();
}