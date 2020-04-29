const db = require('../db');

const User = require('../models/user.model');

const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: '',
  from: 'ukthitayeumi@gmail.com',
  subject: 'Alert your account',
  text: 'We recognize that you have entered the wrong password multiple times',
  html: '<strong>We recognize that you have entered the wrong password multiple times</strong>',
};

module.exports.login = (req, res) => {
  res.render('auth/login.pug');   
};

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const user = await User.findOne({email: email});

  if(!user) {
      res.render("auth/login", {
          errors: [
              "Email does not exist"
          ],
          values: req.body
      });
      return;
  }
  
  if(user.wrongLoginCount >= 3) {
    if(!user.sentEmail) {
      msg.to = user.email;
      sgMail.send(msg).then(() => {
        console.log('Message sent')
      }).catch((error) => {
        console.log(error.response.body);
      })
      await User.updateOne({email: email}, {sentEmail: true})
    }
    res.render('auth/login', {
      errors: [
          "Enter the wrong password too many times"
      ],
      values: req.body
    });
    return;
  }
  
  const match = await bcrypt.compare(pass, user.pass);
  if(!match) {
    await User.updateOne({email: email},{ $inc: {wrongLoginCount: 1}});

    res.render('auth/login', {
        errors: [
            "Password is incorrect"
        ],
        values: req.body
    });
    return;
  }
  res.cookie('userId', user.id, {
    signed: true
  });
  if(user.isAdmin === true) {
    res.redirect("/users");
    return;
  }
  res.redirect("/transactions");

};
