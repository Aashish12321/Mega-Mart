const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  color: { type: String },
  specs: [
    {
      size: { type: String },
      stock: { type: Number, min: 0, required: true },
      available: {
        type: Number,
        min: 0,
        default: function () {
          return this.stock;
        },
      },
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
    products: { type: String, required: true },
    ratings: {
      avgRating: { type: Number, default: 0 },
      ratingCount: { type: Number, default: 0 },
      commentCount: { type: Number, default: 0 },
    },
    variants: [variantSchema],
    seller: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);


ProductSchema.index(
  {
    name: "text",
    description: "text",
    brand: "text",
    category: "text",
    subCategory: "text",
    products: "text",
    price: { sell: "number" },  
  },
  {
    weights: {
      name: 10,
      description: 5,
      products: 6,
      price: { sell: 5 },
      brand: 2,
      category: 1,
      subCategory: 1,
    },
  }
);
// 1 means ascending.
ProductSchema.index({ name: 1 });
ProductSchema.index({ products: 1 });
ProductSchema.index({ description: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ subCategory: 1 });
ProductSchema.index({ price: { sell: 1 } });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
