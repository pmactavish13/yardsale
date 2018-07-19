const mongoose = require("mongoose");
// const Product = require("./product")
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  authId: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: true },
  phoneNum: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: false },
  picture: { type: String, required: false },
  date: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  product: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;