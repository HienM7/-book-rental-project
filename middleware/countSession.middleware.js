const db = require('../db');

module.exports = (req, res, next) => {
  
  db.get("sessions")
  .find({sessionId: req.signedCookies.sessionId})
  .update("count", count => {
    count = count + 1;
    // console.log(req.cookies.sessionId+": "+count);
    return count; 
  })
  .write();

  next();
}