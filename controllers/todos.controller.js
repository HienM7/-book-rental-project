const db = require('../db');

module.exports.getTodos = (req, res) => {
  let q="";
  if(req.query.q) q = req.query.q;   
  const matchedList = db.get('todos').value().filter(item => item.text.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render('./todos', {
    list: matchedList,
    q: q
  });
};

module.exports.postTodo = (req, res) => {
  const todo = { text: req.body.todo };
  db.get('todos').push(todo).write();
  res.redirect('back');
};




