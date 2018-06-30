const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;