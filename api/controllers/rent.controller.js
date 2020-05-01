const Session = require('../../models/session.model');
const Book = require('../../models/book.model');
const Transaction = require('../../models/transaction.model');
const Rent = require("../../models/rent.model");

const shortid = require('shortid');

module.exports.addToRent = async function(req, res) {
    const bookId = req.params.id;
    const userId = req.body.userId;
    if(!userId) {
      res.json('User Id is not exist');
    }
    let user = await Rent.findOne({userId: userId })
    let count = user["rent"][bookId] || 0;

    await Rent.updateOne({userId: userId},{["rent."+ bookId]: count + 1});
    
    res.json({
      ['rend.' + bookId]: count + 1,
      status: "success"
    })

}

module.exports.listRent = async function(req, res) {
  const userId = req.body.userId;
  if(!userId) {
    res.json('User Id is not exist');
    return;
  }

  let rent = await Rent.findOne({userId: userId});

  rent = rent.rent;

  let listRent = await Book.find();

  listRent = listRent.filter(book => book.id in rent);
 
  res.json(listRent);
}

module.exports.submitRent = async function(req, res) {
  const userId = req.body.userId;

  if(!userId) {
    res.json('User Id is not exist');
    return;
  }

  let rent = await Rent.findOne({userId: userId});
  if(!rent) {
    res.json('User Id is not exist');
    return;
  }

  rent = rent.rent;

  // for(const key in rent) {
  //   await Transaction.create({
  //     id: shortid.generate(),
  //     userId: userId,
  //     bookId: key
  //   })
  // }
  await Rent.updateOne({userId: userId}, {rent: {}});

  res.json({
    status: "Success"
  });
}