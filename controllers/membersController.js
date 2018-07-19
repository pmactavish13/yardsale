const db = require("../models");
const mongoose = require('mongoose');
// Defining methods for the membersController
module.exports = {
  findById: function (req, res) {
    db.Member
      .findById(req.params.id, { password: 0 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByAuth: function (req, res) {
    db.Member
      .findOne({ authId: req.body.authId }, { password: 0 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(JSON.stringify(req.body))
    db.Member
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    req.body.member = new mongoose.Types.ObjectId(req.body.member);
    console.log("mongoose" + req.body.member);
    db.Member
      .findOneAndUpdate({ _id: req.body.member }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
//   findOneAndUpdate: function (req, res) {
//     console.log("27" + req.params.member)
//     req.params.id = new mongoose.Types.ObjectId(req.params.member);
//     console.log("29" + req.params.member);
//     req.body.member = new mongoose.Types.ObjectId(req.body.product);
//     console.log("31" + req.body.product);
//       db.Member
//       .findOneAndUpdate({_id: req.body.member }, { $pull: { product: req.body.product} })
//       .then(dbMember => res.json(dbMember))
//       .catch(err => res.status(422).json(err));
// },
  remove: function (req, res) {
    db.Member
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};