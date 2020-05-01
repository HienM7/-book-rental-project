const User = require('../../models/user.model');

const bcrypt = require('bcrypt');

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const user = await User.findOne({email: email});

  if(!user) {
      res.json({error: "Email does not exist"})
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
    res.json({error: "Enter the wrong password too many times"});
    return;
  }
  
  const match = await bcrypt.compare(pass, user.pass);
  if(!match) {
    await User.updateOne({email: email},{ $inc: {wrongLoginCount: 1}});

    res.json({error: "Password is incorrect"})
    return;
  }
  
  res.json({
    name: user.name,
    avatar: user.avatarUrl,
    userId: user.id
  })
};