const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: () => new mongoose.Types.UUID().toString(),
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    available: { type: Number, required: true },
    reserved: { type: Number, default: 0 },
  },
  status: {
    type: Number, // 1 = active, 0 = inactive
    default: 1,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
