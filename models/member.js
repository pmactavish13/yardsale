const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // username: { type: String, required: true },
  phoneNum: { type: Number, required: false },
  email: { type: String, required: true },
  password: {type: String, required: true},
  date: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;