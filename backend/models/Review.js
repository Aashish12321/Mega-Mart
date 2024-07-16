const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  images: [{ type: String }], // Array of photo URLs
  timestamps: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
