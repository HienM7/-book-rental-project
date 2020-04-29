const db = require('../db');
const Session = require('../models/session.model');

module.exports = async (req, res, next) => {
    if(req.signedCookies.sessionId) {
        const session = await Session.findOne({id: req.signedCookies.sessionId});
        let rent = session.rent;
        let count = 0;        
        for (let key in rent) {
            count += rent[key];
        }
        res.locals.rentCount = count;
    }
    next();
};