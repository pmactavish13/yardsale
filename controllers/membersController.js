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
  remove: function (req, res) {
    db.Member
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // TODO:  Remove this function, since Auth0 supercedes
  validPassword: function (req, res) {
    db.Member
      .findById({ _id: req.params.id }, { password: 0 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};