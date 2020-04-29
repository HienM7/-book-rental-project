const db = require('../db');

module.exports =  (req, res, next) => {
    if(req.signedCookies.sessionId) {
        const session = db.get("sessions")
          .find({id: req.signedCookies.sessionId})
          .value();
        let rent = session.rent;
        let count = 0;        
        for (let key in rent) {
            count += rent[key];
        }
        res.locals.rentCount = count;
    }
    next();
};