const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },
    variantId: { type: String, required: true },
    userId: { type: String, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Favourite = mongoose.model("Favourite", FavouriteSchema);

module.exports = Favourite;
