const db = require("../models");

// Defining methods for the productsController
module.exports = {
  findAll: function (req, res) {
    db.Product
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    // console.log("prod controller" + req.params.id)
    db.Product
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Product
      .create(req.body)
      .then(dbProduct =>
        db.Member.findOneAndUpdate({ _id: req.body.member }, { $push: { product: dbProduct._id } })
      )
      .then(dbMember =>
        res.json(dbMember))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },
  update: function (req, res) {
    db.Product
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  remove: function (req, res) {
    db.Product
      .findById({ _id: req.params.id })
      .then(dbProduct => dbProduct.remove())
      .then(dbProduct => {
        return db.Member.findOneAndUpdate({ _id: req.body.member._id }, { $pull: { 'product': req.params.id } })
      })
      .then(member => {
        console.log('Matching member', member)
        res.json(member)

      })
      .catch(err => res.status(422).json(err));
  }
}