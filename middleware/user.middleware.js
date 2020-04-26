module.exports = (req, res, next) => {
  const errors = [];
  const name = req.body.name;
  if(name.length > 30) {
    errors.push("The name must be less than 30 characters")
  } 
  if(errors.length) {
    res.render('users/create', {
      errors: errors
    })
    return;
  }
  next();
};