const shortid = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {
  
  if(!req.signedCookies.sessionId) {
    const id = shortid.generate();
    res.cookie("sessionId", id, {
      signed: true
    });  
    db.get("sessions")
      .push({
        id: id,
        rent: {}
      })
      .write();
  } 
  next();
}