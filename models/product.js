const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  // category: { type: String, required: true },
  item: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  selectOption: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  image1: { data: Buffer, type: String, required: true },
  // image2: { data: Buffer, type: String, required: false},
  // image3: { data: Buffer, type: String, required: false },
  username: { type: String, required: true },
  location: { type: String, required: true },
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member"
}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
