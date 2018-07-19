const db = require("../models");

// Defining methods for the notesController
module.exports = {
  find: function (req, res) {
    console.log("find body " + req.params.memberid);
    console.log("find body " + req.params.productid);
    db.Note
    //.find (req.params.ids)
      .find({ product_id: req.params.productid, member_id: req.params.memberid })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("notesController create" + req.body)
    db.Note
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Note
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Note
      .find({ product_id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};