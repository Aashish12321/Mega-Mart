const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  images: [{ type: String }], // Array of photo URLs
  timestamp: { type: Date, default: Date.now },
});

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true },
});

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  sizeAndstock: [sizeSchema],
  weight: { type: Number, default: 0 },
  material: { type: String },
  images: [{ type: String, required: true }],
});

const ProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: {
    costPrice: { type: Number, required: true },
    marketRetailPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
  },
  discount: { type: Number },
  category: { type: String, required: true },
  subCategory: { type: String, required: true},
  product: { type: String, required: true},

  variants: [variantSchema],
  reviews: [reviewSchema],
  totalReviews: { type: Number, default: 0 }, // Number of reviews
  ratings: {
    averageRating: { type: Number, min: 0, max: 5, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  seller: {
    sellerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerName: { type: String, required: true },
  },
  timestamps: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
