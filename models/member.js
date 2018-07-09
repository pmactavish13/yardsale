const mongoose = require("mongoose");
//TODO: Encryption - Bcrypt is broken on YARN.
//TODO: Bleeding edge version fixes it...  
//TODO: https://github.com/yarnpkg/yarn/issues/2286
// const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // username: { type: String, required: true },
  phoneNum: { type: Number, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }
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