const shortid = require('shortid');
const db = require('../db');
const Session = require('../models/session.model');

module.exports = async (req, res, next) => {
  
  if(!req.signedCookies.sessionId) {
    const id = shortid.generate();
    res.cookie("sessionId", id, {
      signed: true
    });  
  
    await Session.create({
      id: id,
    });
  } 
  next();
}