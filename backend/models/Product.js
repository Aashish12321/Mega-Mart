const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  color: { type: String },
  specs: [
    {
      size: { type: String },
      stock: { type: Number, required: true },
    },
  ],
  images: [{ type: String, required: true }],
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
      cost: { type: Number, required: true },
      mrp: { type: Number, required: true },
      sell: { type: Number, required: true },
    },
    weight: { type: Number, default: 0 },
    discount: { type: Number },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    products: { type: String },

    variants: [variantSchema],
    ratings: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      total: { type: Number, default: 0 },
    },
    seller: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
    customerReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
