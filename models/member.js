const mongoose = require("mongoose");
//TODO: Encryption - Bcrypt is broken on YARN.  Issue goes away with Auth0
// const bcrypt = require('bcrypt');
const Product = require("./product")
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  authId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  phoneNum: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: false },
  picture: { type: String, required: false },
  date: { type: Date, default: Date.now },
  lastvisit: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  product: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
 }]
});

memberSchema.methods.generateHash = function (password) {
  return password;
  // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

memberSchema.methods.validPassword = function (password) {
  // return bcrypt.compareSync(password, this.password);
  return (password === this.password);
};

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;