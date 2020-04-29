const db = require('../db');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  const user = await User.findOne({id: req.signedCookies.userId});
  if(!user) {
    res.redirect("/auth/login");
    return;
  }
  
  next();

}