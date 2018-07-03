const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: { type: String, required: true },
  item: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  textAlertNum: { type: Number, required: false },
  date: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;