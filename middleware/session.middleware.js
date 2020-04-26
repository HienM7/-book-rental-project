const shortid = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {
  
  if(!req.signedCookies.sessionId) {
    const sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });  
    db.get("sessions")
      .push({
        sessionId: sessionId,
        count: 0
      })
      .write();
  } 
  next();
}